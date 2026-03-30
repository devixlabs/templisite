# Hosting Decision

**Date:** March 30, 2026

## 1. Target Domain
The production domain for this website will be:
**`templisite.devixlabs.com`**

## 2. Hosting Architecture
We will use **AWS S3 + CloudFront** for hosting:
- **S3 Bucket:** Acts as the origin, storing the generated static files and `no-cache` JSON API files.
- **CloudFront Distribution:** Provides CDN caching, edge optimization, and HTTPS termination using an AWS Certificate Manager (ACM) certificate.

## 3. DNS Status
- **Current State:** Needs to be provisioned.
- **Action:** DNS and the associated S3/CloudFront infrastructure should be provisioned via DevixLabs Infrastructure-as-Code (IaC) conventions. 

*Note: S3 deployment scripts are currently in `scripts/deploy-s3.js` and rely on environment variables (`AWS_ACCESS_KEY_ID`, `S3_BUCKET`, etc.). Once the IaC is run, update `.envrc` locally with the generated bucket name.*