#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { FoundationStack } from '../lib/dz-foundation-stack';

const app = new cdk.App();
const foundationStack = new FoundationStack(app, 'DzFoundationStack', {});