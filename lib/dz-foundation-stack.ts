import * as cdk from 'aws-cdk-lib';
import { Role,ServicePrincipal,PolicyStatement,Effect,CompositePrincipal } from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export class FoundationStack extends cdk.Stack {
  public roleDomainExecution : Role;
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    // creation of IAM role for datazone
    this.roleDomainExecution = this.createRoleDomainExecution();

  }
  private createRoleDomainExecution() {
    const role = new Role(this, 'RoleDzDomainExecution', {
      roleName: 'RoleDzDomainExecution',
      assumedBy: new CompositePrincipal(
        new ServicePrincipal('cloudformation.amazonaws.com'),
      ),
      managedPolicies: [{
        managedPolicyArn: 'arn:aws:iam::aws:policy/service-role/AmazonDataZoneDomainExecutionRolePolicy'
      }]
    })
    const dataZoneAssumeRoleStatement = new PolicyStatement({
      effect: Effect.ALLOW,
      principals: [new ServicePrincipal('datazone.amazonaws.com')],
      actions: ['sts:AssumeRole', 'sts:TagSession'],
      conditions: {
        'StringEquals': {
          'aws:SourceAccount': this.account,
        },
        'ForAllValues:StringLike': {
          'aws:TagKeys': 'datazone*',
        },
      },
    });
  
    role.assumeRolePolicy?.addStatements(dataZoneAssumeRoleStatement);
    return role;
  }
}
