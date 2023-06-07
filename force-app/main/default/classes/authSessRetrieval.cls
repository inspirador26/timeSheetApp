public with sharing class authSessRetrieval {
    @AuraEnabled(cacheable=true)
    public static List<Employee__c> getEmployees() {
        Set<Id> userIds = new Set<Id>();
        List<AuthSession> currentlyOnlineEmployees = [SELECT  Id, createddate, IsCurrent, SessionType, UsersId, LogoutUrl, SourceIp FROM AuthSession WHERE SessionType = 'Aura' OR SessionType = 'Content'];
        for (AuthSession employee : currentlyOnlineEmployees) {
            userIds.add(employee.UsersId);
        }
        List<Employee__c> activeEmployees = [SELECT Name, First_Name__c, Last_Name__c, User__r.Name, Status__c FROM Employee__c WHERE User__c IN :userIds];
        return activeEmployees;
    }
}