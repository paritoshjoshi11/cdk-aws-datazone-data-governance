import {Stack,StackProps} from 'aws-cdk-lib';
import { CfnDomain } from 'aws-cdk-lib/aws-datazone';
import { Role } from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export interface DzDomainStackProps extends StackProps {
    readonly roleDomainExecution: Role;
    readonly domainName: string;
}

export class DzDomainStack extends Stack { 
  constructor(scope: Construct, id: string, props: DzDomainStackProps) {
    super(scope, id, props);
    
    const domain = new CfnDomain(this, 'DzDomain', {
        domainExecutionRole: props.roleDomainExecution.roleArn,
        name: props.domainName
    });
}
}