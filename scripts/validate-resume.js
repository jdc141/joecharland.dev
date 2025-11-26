#!/usr/bin/env node

/**
 * Resume JSON Validator
 * 
 * Validates that resume.json has all required fields and proper structure
 * Run: node scripts/validate-resume.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const resumePath = path.join(__dirname, '../src/data/resume.json');

console.log('🔍 Validating resume.json...\n');

try {
  // Read and parse JSON
  const resumeData = JSON.parse(fs.readFileSync(resumePath, 'utf-8'));
  
  let errors = [];
  let warnings = [];
  
  // Validate personal section
  if (!resumeData.personal) {
    errors.push('Missing "personal" section');
  } else {
    const required = ['name', 'title', 'github', 'linkedin'];
    required.forEach(field => {
      if (!resumeData.personal[field]) {
        errors.push(`Missing personal.${field}`);
      }
    });
  }
  
  // Validate experience
  if (!resumeData.experience || !Array.isArray(resumeData.experience)) {
    errors.push('Missing or invalid "experience" array');
  } else {
    resumeData.experience.forEach((job, index) => {
      const required = ['company', 'location', 'title', 'startDate', 'endDate', 'highlights', 'technologies'];
      required.forEach(field => {
        if (!job[field]) {
          errors.push(`Experience ${index}: Missing "${field}"`);
        }
      });
      
      if (job.highlights && job.highlights.length === 0) {
        warnings.push(`Experience ${index} (${job.title}): No highlights listed`);
      }
      
      if (job.technologies && job.technologies.length === 0) {
        warnings.push(`Experience ${index} (${job.title}): No technologies listed`);
      }
    });
  }
  
  // Validate education
  if (!resumeData.education || !Array.isArray(resumeData.education)) {
    errors.push('Missing or invalid "education" array');
  } else {
    resumeData.education.forEach((edu, index) => {
      const required = ['institution', 'degree', 'graduationDate'];
      required.forEach(field => {
        if (!edu[field]) {
          errors.push(`Education ${index}: Missing "${field}"`);
        }
      });
    });
  }
  
  // Validate skills
  if (!resumeData.skills) {
    errors.push('Missing "skills" section');
  } else {
    const required = ['languages', 'tools', 'focusAreas'];
    required.forEach(field => {
      if (!resumeData.skills[field] || !Array.isArray(resumeData.skills[field])) {
        errors.push(`Missing or invalid skills.${field}`);
      }
    });
  }
  
  // Report results
  if (errors.length === 0 && warnings.length === 0) {
    console.log('✅ Resume validation passed!');
    console.log(`   - ${resumeData.experience.length} job(s)`);
    console.log(`   - ${resumeData.education.length} degree(s)`);
    console.log(`   - ${resumeData.skills.languages.length} languages/frameworks`);
    console.log(`   - ${resumeData.skills.tools.length} tools`);
    console.log(`   - ${resumeData.skills.focusAreas.length} focus areas\n`);
    process.exit(0);
  }
  
  if (errors.length > 0) {
    console.log('❌ Validation errors:\n');
    errors.forEach(err => console.log(`   - ${err}`));
    console.log('');
  }
  
  if (warnings.length > 0) {
    console.log('⚠️  Warnings:\n');
    warnings.forEach(warn => console.log(`   - ${warn}`));
    console.log('');
  }
  
  if (errors.length > 0) {
    process.exit(1);
  }
  
} catch (error) {
  if (error.code === 'ENOENT') {
    console.error('❌ resume.json not found at:', resumePath);
  } else if (error instanceof SyntaxError) {
    console.error('❌ Invalid JSON syntax:');
    console.error(`   ${error.message}`);
  } else {
    console.error('❌ Validation error:', error.message);
  }
  process.exit(1);
}

