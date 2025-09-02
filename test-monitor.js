#!/usr/bin/env node

const { AzureAppGenerator } = require('./scripts/azureAppGenerator.ts');

async function testMonitor() {
  console.log("Testing Monitor app generation...");
  
  const generator = new AzureAppGenerator("./azure-rest-api-specs");
  
  try {
    await generator.generateMonitorManagementApp();
    await generator.generateMonitorDataPlaneApp();
    console.log("Monitor apps generated successfully!");
  } catch (error) {
    console.error("Error generating Monitor apps:", error);
  }
}

testMonitor();