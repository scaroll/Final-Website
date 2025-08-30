#!/usr/bin/env node

/**
 * PG Closets Deployment Command
 * 
 * This script will ALWAYS deploy to the live PG Closets website
 * Can be called from Claude Code or command line
 */

const { execSync } = require('child_process');
const path = require('path');

console.log('🚀 PG CLOSETS PRODUCTION DEPLOYMENT');
console.log('=====================================');
console.log('');

// Set the working directory to the script's directory
process.chdir(__dirname);

try {
    // Check if we have the deployment script
    const deployScript = path.join(__dirname, 'deploy-pgclosets.sh');
    
    // Make sure the script is executable
    execSync('chmod +x deploy-pgclosets.sh');
    
    // Run the deployment script
    execSync('./deploy-pgclosets.sh', { 
        stdio: 'inherit',
        cwd: __dirname
    });
    
} catch (error) {
    console.error('❌ Deployment failed:', error.message);
    process.exit(1);
}