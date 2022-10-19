<p align="center">
    <img src="https://raw.githubusercontent.com/Mikheull/wd-tasks/master/public/banner/aws.png" />
    <h2 align="center">Weekdev #3 | NextJS tasks application with Amazon Web Services</h2>
</p> 
<p align="center">By Mikhael Bailly</p>

## 🚀 Intro
Welcome to the third edition of WeekDev 2022. The WeekDev is a challenge that I launched myself, where I develop an idea in maximum 1 week. At the end of this period I would no longer edit the code ! The goal is to improve myself in development and discover new techniques, new languages.

**Task on the cloud**<br>

<DESCRIPTION>

## Table of Contents
- [🚀 Intro](#-intro)
- [Table of Contents](#table-of-contents)
- [Informations](#informations)
- [Tasks](#tasks)
- [Tools used](#tools-used)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Result](#result)


## Informations
The challenge began on Friday 14 October 2022 and will be ended on Friday 21 October 2022 ! It aims to bring me knowledge in NextJS, AWS and cloud deployment. During the development, I work on the branch "dev".

## Tasks
I created a Kanban table to reference all my tasks available [here](https://github.com/users/Mikheull/projects/1/views/1). It will be regularly updated<br>
Main tasks :
- Create NextJS App
- Create DynamoDB
- User related methods
- Task related methods
- Deployment on Amplify
- Upload images (Url, Locally, Unsplash)

## Tools used
- NextJS
- AWS Lambda
- AWS API Gateway
- AWS Dynamo DB
- AWS Amplify
- AWS CloudWatch
- AWS S3
- AWS IAM
- Unsplash API

## Installation

Use `git clone` to install this app.

```bash
git clone https://github.com/Mikheull/wd-tasks
npm install
```

## Configuration

1) Create two DynamoDb tables **wd-tasks-items** and **wd-tasks-users**
2) Create the lambda functions available in the folder `AWS/lambda` with the roles
3) Create an API Gateway with the roles linked to lambda functions
4) Create a S3
5) Create a Unsplash App
6) Create a `.env` file in root directory and write the configuration below.
```bash
NEXT_PUBLIC_API_GATEWAY_URL=
NEXT_PUBLIC_API_KEY=
S3_UPLOAD_KEY=
S3_UPLOAD_SECRET=
S3_UPLOAD_BUCKET=
S3_UPLOAD_REGION=
NEXT_UNSPLASH_KEY=
```
7) [OPTIONAL] Delete the `amplify` folder and re-init amplify
8) [OPTIONAL] Deploy to amplify

## Usage

```bash
npm run dev
```


## Result
Here is the result after 1 week :<br>
<img src="https://raw.githubusercontent.com/Mikheull/wd-tasks/master/public/result.gif">
