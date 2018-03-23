# [Résumé](https://resume.orleans.io) [![Build Status](https://travis-ci.org/dudeofawesome/resume.svg?branch=master)](https://travis-ci.org/dudeofawesome/resume)
[Louis Orleans' résumé](https://resume.orleans.io)

## Getting started

1. Install dependencies
    ```bash
    $ yarn install
    ```
1. Build website
    ```bash
    $ gulp build
    ```

## Building your own résumé
1. Fork & clone this repository
1. Install dependencies
    ```bash
    $ yarn install
    ```
1. Start dev server
    ```bash
    $ gulp dev
    ```
1. Update values in [`package.json`](package.json)
    - `long_name`
    - `description`
    - `homepage`
    - `repository`
    - `author`
1. Update values in [`readme.md`](readme.md)
    - résumé site links
    - travis links
1. Update copy in [`src/data.yaml`](src/data.yaml)
1. Update colors
    - [`src/style/_variables.scss`](src/style/_variables.scss)
        - `$colors` map
        - `$pixels` map & associated single pixel images
    - [`src/templates/index.mustache`](src/templates/index.mustache)
        - `theme-color` meta tag
    - [`src/config/manifest.yaml.mustache`](src/config/manifest.yaml.mustache)
        - `background_color`
        - `theme_color`
1. Update icons in [`src/assets/icon`](src/assets/icon)

## Deploying your résumé with AWS
1. Create a new [CloudFormation](https://console.aws.amazon.com/cloudformation/home) stack
    1. Choose "Upload a template to Amazon S3", picking [`aws-cloud-formation.yaml`](aws-cloud-formation.yaml).
    1. Set stack parameters
        - `CFPriceClass` - CloudFront distribution price class
        - `hostname` - résumé website hostname. eg `resume.orleans.io`
    1. Use default options
    1. Acknowledge that CloudFormation will create IAM resources for Travis access, then hit "Create"
1. Create a new access key for the Travis user
    1. Visit the [AWS IAM users page](https://console.aws.amazon.com/iam/home#/users)
    1. Find your the Travis user created by CloudFormation
    1. Go to the "Security credentials" tab
    1. Click "Create access key"
    1. Make note of the "Secret access key" shown in the dialog. You won't be able to recover it later.
    1. Delete the old access key created by CloudFormation
1. Enable [Travis CI building](https://travis-ci.org/)
    1. Go to [your Travis profile page](https://travis-ci.org/profile) & enable your `resume` repo
    1. Go to the Travis settings page for your `resume` repo
    1. Set environment variables
        |Name|Value|
        |-|-|
        |`AWS_ACCESS_KEY_ID`|ID of the access key you created earlier|
        |`AWS_ACCESS_KEY_SECRET`|Secret access key you noted previously|
        |`AWS_CLOUDFRONT_PROD_DISTRIBUTION_ID`|ID of CloudFront Distribution created by CloudFormation|
        |`AWS_S3_PROD_BUCKET`|Name of S3 Bucket created by CloudFormation|
