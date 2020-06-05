# Water meter parser

## Local development

Install dependencies
```
npm install
```

To test, run
```
npm test
```

To build, run
```
npm run build
```

## Deployment
This project makes use of the [Serverless Framework](https://www.serverless.com/) for deployment.

To deploy,
- Make sure you've created a `Google Storage` bucket in your Google Cloud account. (default in code is `water-meter`)
- Change your project and service name in the `serverless.yml` file, and update the path to your local `json` key file.
- Next, run `npm run deploy`

Test your deployment by uploading pictures to your bucket with `gsutil` command line utility:
```
gsutil cp ./data/your-picture.jpg gs://water-meter
```
