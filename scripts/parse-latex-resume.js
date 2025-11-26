#!/usr/bin/env node

/**
 * LaTeX Resume Parser - Custom for Joseph Charland's Resume Format
 * 
 * Parses resume.tex and generates resume.json
 * Usage: npm run parse:resume
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to your LaTeX resume
const latexPath = path.join(__dirname, '../resume/resume.tex');
const outputPath = path.join(__dirname, '../src/data/resume.json');

console.log('📄 Parsing LaTeX resume...\n');

try {
  const latexContent = fs.readFileSync(latexPath, 'utf-8');
  
  // Initialize resume data structure
  const resumeData = {
    personal: {
      name: "",
      title: "Full Stack Software Engineer",
      github: "",
      linkedin: "",
      email: ""
    },
    experience: [],
    education: [],
    skills: {
      languages: [],
      tools: [],
      focusAreas: []
    }
  };
  
  // Helper function to clean LaTeX commands and special characters
  function cleanLatex(text) {
    return text
      .replace(/\\textbf\{([^}]+)\}/g, '$1')
      .replace(/\\textit\{([^}]+)\}/g, '$1')
      .replace(/\\emph\{([^}]+)\}/g, '$1')
      .replace(/\\href\{[^}]+\}\{([^}]+)\}/g, '$1')
      .replace(/\\url\{([^}]+)\}/g, '$1')
      .replace(/\\\\/g, '')
      .replace(/\\%/g, '%')  // Escaped percent
      .replace(/~/g, ' ')
      .replace(/\\&/g, '&')
      .replace(/‑/g, '-')  // en-dash to hyphen
      .replace(/–/g, '-')  // em-dash to hyphen
      .replace(/—/g, '-')  // long dash to hyphen
      .replace(/\s+/g, ' ')
      .trim();
  }
  
  // Parse personal info from header
  const nameMatch = latexContent.match(/\\LARGE\s+\\textbf\{([^}]+)\}/);
  if (nameMatch) {
    resumeData.personal.name = cleanLatex(nameMatch[1]);
  }
  
  const emailMatch = latexContent.match(/\\href\{mailto:([^}]+)\}/);
  if (emailMatch) {
    resumeData.personal.email = emailMatch[1];
  }
  
  const linkedinMatch = latexContent.match(/linkedin\.com\/in\/([^\/\}]+)/);
  if (linkedinMatch) {
    resumeData.personal.linkedin = linkedinMatch[1];
    resumeData.personal.github = "jdc141"; // Default, update if in LaTeX
  }
  
  // Parse Experience Section
  // Format: \textbf{Company,} Location: Job Title \\
  //         Month Year – Month Year
  //         \vspace{...} (optional)
  //         \begin{itemize} ... \end{itemize}
  
  const experienceSection = latexContent.match(/\\section\*\{Experience\}([\s\S]*?)\\section\*\{Education\}/);
  
  if (experienceSection) {
    const expText = experienceSection[1];
    
    // More flexible regex - some entries have colon, some don't
    // Pattern 1: Company, Location: Title
    // Pattern 2: Company, Title (no location/colon)
    const jobPattern = /\\textbf\{([^}]+)\},?\s*([^\\]+?)\\+\s*([\s\S]*?)\\begin\{itemize\}([\s\S]*?)\\end\{itemize\}/g;
    const jobMatches = [...expText.matchAll(jobPattern)];
    
    for (const match of jobMatches) {
      let company = cleanLatex(match[1]);
      // Remove trailing comma from company name
      if (company.endsWith(',')) {
        company = company.slice(0, -1);
      }
      const headerLine = match[2]; // Could be "Location: Title" or just "Title"
      const betweenText = match[3]; // Contains date and vspace
      const itemsText = match[4];
      
      // Parse header line for location and title
      let location = "";
      let title = "";
      
      if (headerLine.includes(':')) {
        // Format: Location: Title
        const parts = headerLine.split(':');
        location = cleanLatex(parts[0]);
        title = cleanLatex(parts.slice(1).join(':'));
      } else {
        // Format: Just Title (no location)
        location = "Remote";
        title = cleanLatex(headerLine);
      }
      
      // Extract date from between text (first line that looks like a date)
      const dateMatch = betweenText.match(/([A-Z][a-z]+\s+\d{4})\s*[-–—]\s*([A-Z][a-z]+\s+\d{4}|Present)/);
      let startDate = "";
      let endDate = "Present";
      
      if (dateMatch) {
        startDate = dateMatch[1].trim();
        endDate = dateMatch[2].trim();
      }
      
      // Extract bullet points
      const highlights = [];
      const itemMatches = [...itemsText.matchAll(/\\item\s+([^\n]+)/g)];
      for (const item of itemMatches) {
        let highlight = cleanLatex(item[1]);
        // Remove period at end if present
        if (highlight.endsWith('.')) {
          highlight = highlight.slice(0, -1);
        }
        if (highlight) {
          highlights.push(highlight);
        }
      }
      
      // Extract technologies from highlights using smart detection
      const techKeywords = {
        'Java': ['Java'],
        'Angular': ['Angular'],
        'Python': ['Python'],
        'SQL': ['SQL'],
        'CI/CD': ['CI/CD', 'pipeline', 'deployment'],
        'REST APIs': ['API'],
        'Visual Basic': ['Visual Basic'],
        'Excel': ['Excel'],
        'Agile': ['agile'],
        'Security': ['security', 'authentication'],
        'Monitoring': ['monitoring']
      };
      
      const technologies = [];
      const allText = highlights.join(' ');
      
      for (const [tech, keywords] of Object.entries(techKeywords)) {
        for (const keyword of keywords) {
          if (new RegExp(keyword, 'i').test(allText) && !technologies.includes(tech)) {
            technologies.push(tech);
            break;
          }
        }
      }
      
      // Add role-specific technologies
      if (title.toLowerCase().includes('project manager') || title.toLowerCase().includes('business')) {
        if (!technologies.includes('Agile')) technologies.push('Agile');
        if (!technologies.includes('UI/UX')) technologies.push('UI/UX');
        if (!technologies.includes('Wireframing')) technologies.push('Wireframing');
      } else if (title.toLowerCase().includes('change management')) {
        if (!technologies.includes('Automation')) technologies.push('Automation');
      }
      
      resumeData.experience.push({
        company,
        location,
        title,
        startDate,
        endDate,
        highlights,
        technologies: technologies.length > 0 ? technologies : ['General Software Development']
      });
    }
  }
  
  // Parse Education Section
  // Format: \textbf{Institution} \\
  //         Degree details (Date)
  
  const educationSection = latexContent.match(/\\section\*\{Education\}([\s\S]*?)\\end\{minipage\}/);
  
  if (educationSection) {
    const eduText = educationSection[1];
    
    // Match institution and degree info
    const eduMatches = [...eduText.matchAll(/\\textbf\{([^}]+)\}\s*\\+\s*([^\n]+)/g)];
    
    for (const match of eduMatches) {
      const institution = cleanLatex(match[1]);
      const degreeInfo = cleanLatex(match[2]);
      
      // Extract graduation date
      const dateMatch = degreeInfo.match(/\(([^)]+)\)/);
      const graduationDate = dateMatch ? dateMatch[1] : "";
      
      // Clean degree name (remove date and [4pt] artifacts)
      let degree = degreeInfo.replace(/\([^)]+\)/, '').replace(/\[\d+pt\]/g, '').trim();
      
      // Check for specialization
      let specialization = null;
      if (degreeInfo.includes('Specialization')) {
        const specMatch = degreeInfo.match(/,\s*([^(]+)\s*Specialization/);
        if (specMatch) {
          specialization = cleanLatex(specMatch[1].trim() + ' Specialization');
        }
      } else if (degreeInfo.includes('&')) {
        // For undergrad with major, keep the full degree
        const parts = degree.split(' in ');
        if (parts.length > 1) {
          degree = parts[0];
          specialization = parts[1];
        }
      }
      
      resumeData.education.push({
        institution,
        degree: degree.split(',')[0].trim(),
        specialization,
        graduationDate
      });
    }
  }
  
  // Parse Skills from right column
  // Extract sections like "Languages", "Frameworks & Tools", etc.
  
  const skillsSection = latexContent.match(/\\textbf\{Skills\}\\+\s*([^\n]+)/);
  if (skillsSection) {
    const skillsText = cleanLatex(skillsSection[1]);
    resumeData.skills.focusAreas = skillsText.split(',').map(s => s.trim()).filter(s => s);
  }
  
  const languagesSection = latexContent.match(/\\textbf\{Languages\}\\+\s*([^\n]+)/);
  if (languagesSection) {
    const langText = cleanLatex(languagesSection[1]);
    resumeData.skills.languages = langText.split(',').map(s => s.trim()).filter(s => s);
  }
  
  // Combine frameworks, tools, DevOps, Database, and Testing sections
  const toolsSections = [
    /\\textbf\{Frameworks[^}]*\}\\+\s*([^\n]+)/,
    /\\textbf\{DevOps[^}]*\}\\+\s*([^\n]+)/,
    /\\textbf\{Database[^}]*\}\\+\s*([^\n]+)/,
    /\\textbf\{Testing[^}]*\}\\+\s*([^\n]+)/
  ];
  
  const allTools = [];
  for (const pattern of toolsSections) {
    const match = latexContent.match(pattern);
    if (match) {
      const tools = cleanLatex(match[1]).split(',').map(s => s.trim()).filter(s => s);
      allTools.push(...tools);
    }
  }
  resumeData.skills.tools = [...new Set(allTools)]; // Remove duplicates
  
  // Output results
  console.log('✅ Successfully parsed resume!\n');
  console.log(`📊 Summary:`);
  console.log(`   - Name: ${resumeData.personal.name}`);
  console.log(`   - Experience: ${resumeData.experience.length} positions`);
  console.log(`   - Education: ${resumeData.education.length} degrees`);
  console.log(`   - Languages: ${resumeData.skills.languages.length} items`);
  console.log(`   - Tools: ${resumeData.skills.tools.length} items`);
  console.log(`   - Focus Areas: ${resumeData.skills.focusAreas.length} items\n`);
  
  // Write to file
  fs.writeFileSync(outputPath, JSON.stringify(resumeData, null, 2));
  console.log(`💾 Saved to: ${outputPath}\n`);
  
  // Detailed output
  console.log('📝 Preview:');
  console.log(JSON.stringify(resumeData, null, 2));
  
} catch (error) {
  if (error.code === 'ENOENT') {
    console.error('❌ LaTeX resume not found at:', latexPath);
    console.error('\n💡 Setup instructions:');
    console.error('   1. Create a "resume" folder in the project root');
    console.error('   2. Copy your main.tex to resume/resume.tex');
    console.error('   3. Run: npm run parse:resume\n');
  } else {
    console.error('❌ Parse error:', error.message);
    console.error('\nStack trace:', error.stack);
  }
  process.exit(1);
}

