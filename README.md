# Full Stack Web Development Project, 19-20

fullstackopen2019project-env.eba-pcnjsufa.eu-central-1.elasticbeanstalk.com/

Description: Simple recipe management app with social elements

Account for testing: user:password, root:password, test:password

Development still in progress

Tech stack: 
Apps containerized and pushed to Docker Hub https://hub.docker.com/u/shomarov
Deployment pipeline created with Travis
Apollo Server, Apollo Client, Nginx reverse proxy: Deployed at AWS Elastic Beanstalk
Prisma: Server deployed at DigitalOcean

For some reason connection from AWS to Prisma keeps crashing down, so the app may be down sometimes until I fix it.
