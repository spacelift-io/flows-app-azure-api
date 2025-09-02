# Azure API Apps for Flows

This repository contains automatically generated Flows apps that provide comprehensive access to Azure services through their REST APIs. Each service is packaged as a separate deployable app with versioning and CI/CD support.

## Overview

This repository generates Flows apps from Azure REST API specifications, providing:

- **Complete Azure API Coverage** - Apps for major Azure services used by DevOps practitioners.
- **Type-Safe Implementation** - Full TypeScript support with generated schemas
- **Individual App Deployment** - Each service deploys as a separate versioned app
- **Automated CI/CD Pipeline** - Build validation and manual deployment workflows

## Repository Structure

```text
flows-app-azure-api/
├── .github/workflows/
│   ├── ci.yml              # CI pipeline for all apps
│   └── deploy-app.yml      # Manual deployment workflow
├── azure-rest-api-specs/   # Git submodule with Azure API specs
├── generated/              # Generated Flows apps
│   ├── arm-api-$service/   # Azure Resource Management API app for the $service
│   ├── azure-api-$service/ # Azure data plane API app for the $service
├── scripts/
│   └── azureAppGenerator.ts # App generation logic
└── package.json            # Root build configuration
```

## Generated Apps

Each generated app follows the standard Flows app structure:

### App Structure

- **Modular Blocks** - Each Azure API operation becomes a Flows block
- **Type Safety** - Full TypeScript definitions from Azure OpenAPI specs
- **Error Handling** - Proper Azure error response handling
- **Authentication** - Azure credential support (service principal, managed identity)

## Development Workflow

### Adding New Azure Services

1. **Update Submodule** - Pull latest Azure API specifications:

   ```bash
   npm run update-models
   ```

2. **Generate Apps** - Run the generator for new services:

   ```bash
   npm run generate
   ```

3. **Test Generated Apps** - Validate the new apps:

   ```bash
   cd generated/[new-app-name]
   npm run typecheck
   npm run format
   npm run bundle
   ```

### Modifying Generation Logic

The app generator (`scripts/azureAppGenerator.ts`) transforms Azure OpenAPI specifications into Flows apps:

- **OpenAPI Parsing** - Reads Azure REST API specifications
- **Block Generation** - Creates Flows blocks for each API operation
- **Type Generation** - Generates TypeScript types from JSON schemas
- **Template Application** - Applies Flows app structure and conventions

## Versioning

Each generated app maintains its own version in a `VERSION` file.

### Version Management

- **Manual Updates** - Bump versions in `VERSION` files when making changes
- **Semantic Versioning** - Follow semver (major.minor.patch)
- **Independent Versioning** - Each app versions independently

## Deployment

### CI/CD Pipeline

The repository includes two GitHub Actions workflows:

#### 1. Continuous Integration (`ci.yml`)

- **Triggers**: All pushes to any branch
- **Matrix Build**: Builds all apps in `generated/` directory in parallel
- **Validation**: Type checking, formatting, and bundling
- **Status**: Required for pull request merging

#### 2. Manual Deployment (`deploy-app.yml`)

- **Triggers**: Manual workflow dispatch
- **Input**: App name to deploy (e.g., "arm-api-compute")
- **Process**: Builds, uploads to R2 registry, and indexes versions
- **Environment**: Requires deployment secrets

### Deploying an App

1. **Navigate to Actions** - Go to repository Actions tab
2. **Select Deploy Workflow** - Choose "Deploy Azure API App"
3. **Run Workflow** - Enter app name (e.g., "arm-api-compute")
4. **Monitor Progress** - Check logs for deployment status

### Deployment Process

The deployment workflow:

1. **Validates App** - Checks VERSION file and package.json exist
2. **Reads Version** - Gets version from VERSION file
3. **Installs Dependencies** - Runs `npm ci`
4. **Creates Bundle** - Runs `npm run bundle`
5. **Calculates Checksum** - SHA256 hash of bundle
6. **Uploads to R2** - Stores in registry at `core/apps/{app}/versions/{version}.tar.gz`
7. **Updates Index** - Maintains version registry for app

### Registry Structure

Apps are deployed to the Flows registry with this structure:

```text
registry-useflows-com/
└── core/apps/
    ├── arm-api-$service/
    │   └── versions/
    │       ├── 0.1.0.tar.gz
    │       └── versions.json
    └── azure-api-$service/
```

## Configuration

### Environment Setup

Required for development:

```bash
# Install dependencies
npm install

# Initialize submodules
npm run setup

# Generate apps
npm run generate
```

### Deployment Secrets

Required GitHub secrets for deployment:

- `FLOWS_REGISTRY_R2_ACCESS_KEY_ID` - Cloudflare R2 access key
- `FLOWS_REGISTRY_R2_SECRET_ACCESS_KEY` - Cloudflare R2 secret key

## Best Practices

### App Development

- **Follow Conventions** - Use generated structure and patterns
- **Test Thoroughly** - Validate type checking and bundling
- **Version Carefully** - Bump versions appropriately for changes
- **Document Changes** - Update VERSION files and commit messages

### App deployment

- **Test First** - Always run CI validation before deployment
- **Version Strategy** - Use semantic versioning consistently
- **Monitor Deployments** - Check workflow logs for issues
- **Coordinate Releases** - Communicate app updates to users

### Repository Management

- **Keep Submodules Updated** - Regularly pull Azure API spec updates
- **Clean Generation** - Regenerate apps when specs change significantly
- **Maintain CI** - Keep GitHub Actions workflows updated
- **Review Changes** - Use pull requests for generation logic changes

## Troubleshooting

### Common Issues

#### Generation Fails

- Check Azure API spec validity
- Verify TypeScript compilation
- Review generator script errors

#### CI Build Fails

- Run `npm run typecheck` locally
- Check formatting with `npm run format`
- Validate bundle creation

#### Deployment Fails

- Verify VERSION file exists and has valid semver
- Check deployment secrets configuration
- Ensure app builds successfully locally

#### App Runtime Issues

- Validate Azure authentication configuration
- Check API endpoint accessibility
- Review error logs in Flows execution

### Getting Help

- Check GitHub Actions logs for detailed error messages
- Validate generated app structure against working examples
- Test individual API operations with direct HTTP calls
- Review Azure API documentation for authentication requirements
