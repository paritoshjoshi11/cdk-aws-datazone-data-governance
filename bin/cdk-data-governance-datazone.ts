#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { FoundationStack } from '../lib/stacks/dz-foundation-stack';
import { DzDomainStack } from '../lib/stacks/dz-domain-stack';
import { DOMAIN_NAME } from '../lib/constants';

const app = new cdk.App();

const foundationStack = new FoundationStack(app, 'DzFoundationStack', {});

const domainStack = new DzDomainStack(app, 'DzDomainStack', { 
  roleDomainExecution: foundationStack.roleDomainExecution,
   domainName: DOMAIN_NAME });