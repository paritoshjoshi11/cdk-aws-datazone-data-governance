#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { FoundationStack } from '../lib/cdk-data-governance-datazone-stack';

const app = new cdk.App();
const foundationStack = new FoundationStack(app, 'CdkDataGovernanceDatazoneStack', {});