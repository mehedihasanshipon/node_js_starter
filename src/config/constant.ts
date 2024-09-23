const redisConstant = {
    // USER_API_KEY: 'apikey',
    USER_BY_APIKEY_REDIS_KEY: 'user:apikey:',
};

const invoiceSendingQueuesConstant = {
    // Invoice Sending Queues Status types
    INVOICE_SENDING_QUEUE_STATUS_TYPE_PENDING: 'PENDING',
    INVOICE_SENDING_QUEUE_STATUS_TYPE_PROCESSING: 'PROCESSING',
    INVOICE_SENDING_QUEUE_STATUS_TYPE_COMPLETED: 'COMPLETED',
    INVOICE_SENDING_QUEUE_STATUS_TYPE_FAILED: 'FAILED',

    // Invoice Sending Queues content types
    INVOICE_SENDING_QUEUE_CONTENT_TYPE_SMS: 'SMS',
    INVOICE_SENDING_QUEUE_CONTENT_TYPE_EMAIL: 'EMAIL',

    // Invoice Sending Queues content types
    INVOICE_SENDING_QUEUE_SENDING_TYPE_INSTANT: 'INSTANT',
    INVOICE_SENDING_QUEUE_SENDING_TYPE_FOLLOWUP: 'FOLLOWUP',
};

const agencyCreditSettings = {
    // Invoice Sending Queues Status types
    AGENCY_CREDIT_SETTINGS_TYPE_SMS: 1,
    AGENCY_CREDIT_SETTINGS_TYPE_MMS: 2,
    AGENCY_CREDIT_SETTINGS_TYPE_VOICE: 3,
    AGENCY_CREDIT_SETTINGS_TYPE_EMAIL: 4,
    AGENCY_CREDIT_SETTINGS_TYPE_VIRTUAL_NUMBER: 5,
    AGENCY_CREDIT_SETTINGS_TYPE_PER_MIN_CHARGE: 6,
};

const invoiceConstant = {
    // Invoice  types
    INVOICE_PDF_GENERATE_YES: 1,
    INVOICE_PDF_GENERATE_PROCESSING: 2,
    INVOICE_PDF_GENERATE_COMPLETED: 3,
    INVOICE_PDF_GENERATE_FAILED: 4,
    INVOICE_PDF_GENERATE_NO: 0,

    INVOICE_TYPE_ONE_TIME: 'ONE_TIME',
    INVOICE_TYPE_RECURRING: 'RECURRING',

    INVOICE_IS_DELETE__YES: 'YES',
    INVOICE_IS_DELETE__NO: 'NO',
    INVOICE_IS_DELETE__PROCESSING: 'PROCESSING',

    INVOICE_END_DATE_STATUS__BY: 'BY',
    INVOICE_END_DATE_STATUS__NEVER: 'NEVER',
    INVOICE_END_DATE_STATUS__AFTER: 'AFTER',

    INVOICE_IS_FIRST_INVOICE_YES: 'YES',
    INVOICE_IS_FIRST_INVOICE_NO: 'NO',
};

const userConstant = {
    // Invoice  types
    USET_EMAIL_PROVIDER_NYLAS_ACTIVE: 1,
    USET_EMAIL_PROVIDER_NYLAS_INACTIVE: 0,
    USET_EMAIL_PROVIDER_NYLAS_V2_ACTIVE: 2,
};

const agencySettingConstant = {
    AGENCY_MAIL_DRIVER: 18,
    AGENCY_MAIL_HOST: 19,
    AGENCY_MAIL_PORT: 20,
    AGENCY_MAIL_USERNAME: 21,
    AGENCY_MAIL_PASSWORD: 22,
    AGENCY_MAIL_ENCRYPTION: 23,
    AGENCY_SENDGRID_MAIL_API_KEY: 38,

    AGENCY_SETTING_STATUS_ACTIVE: 1,
    AGENCY_SETTING_STATUS_INACTIVE: 0,
};

const virtualNumberConstant = {
    VIRTUAL_NUMBER_STATUS_ACTIVE: 1,
    VIRTUAL_NUMBER_IS_DEFAULT: 1,
};

const templateConstant = {
    TEMPLATE_STANDERD: 1,
    TEMPLATE_DEFAULT: 2,
    TEMPLATE_BASIC: 3,
};

const clientCanSeeConstant = {
    QUANTITY: 1,
    PRICE: 2,
    TAX_PERCENT: 3,
    LINE_TOTAL: 4,
    SUB_TOTAL: 5,
    SHIPPING_CHARGE: 6,
    DISCOUNT: 7,
    TAXES: 8,
};

const clientCanSeeDefaultConstant = {
    QUANTITY: 1,
    PRICE: 2,
    LINE_TOTAL: 4,
    SUB_TOTAL: 5,
    TAXES: 8,
};

const invoicePaymentConstant = {
    INVOICE_PAYMENT__IS_REPORT_UPDATED_YES: 1,
    INVOICE_PAYMENT__IS_REPORT_NOT_NO: 0,

    INVOICE_PAYMENT__IS_REPORT_GENERATE__YES: 1,
    INVOICE_PAYMENT__IS_REPORT_GENERATE__NO: 0,
    INVOICE_PAYMENT__IS_REPORT_GENERATE__PAID: 2,
    INVOICE_PAYMENT__IS_REPORT_GENERATE__PROCESSING: 3,

    // 'INACTIVE','ACTIVE','RECURRING','COMPLETED'
    INVOICE_PAYMENT__STATUS__INACTIVE: 'INACTIVE',
    INVOICE_PAYMENT__STATUS__ACTIVE: 'ACTIVE',
    INVOICE_PAYMENT__STATUS__COMPLETED: 'COMPLETED',
};

const reminderSettingConstant = {
    SCHEDULE_TYPE__BEFORE: 'BEFORE_DUE_DATE',
    SCHEDULE_TYPE__AFTER: 'AFTER_DUE_DATE',
    CONTENT_TYPE__SMS: 'SMS',
    CONTENT_TYPE__EMAIL: 'EMAIL',

    REMINDER_SETTING_STATUS_TYPE_ACTIVE: 'ACTIVE',
    REMINDER_SETTING_STATUS_TYPE_IN_ACTIVE: 'INACTIVE',

    REMINDER_SETTING_ADDRESS_TYPE_ME: 'ME',
    REMINDER_SETTING_ADDRESS_TYPE_CUSTOMER: 'CUSTOMER',
    REMINDER_SETTING_ADDRESS_TYPE_CUSTOMER_AND_ME: 'CUSTOMER_AND_ME',
};

const invoiceTemplateConstant = {
    TEMPLATE_TYPE_EMAIL: 'EMAIL',
    TEMPLATE_TYPE_SMS: 'SMS',
};

const userPersonalizeTagConstant = {
    USER_NAME: '[[my_name]]',
    USER_FIRST_NAME: '[[my_first_name]]',
    USER_LAST_NAME: '[[my_last_name]]',
    USER_EMAIL: '[[my_email]]',
    USER_PHONE: '[[my_phone]]',
    USER_VIRTUAL_NUMBER: '[[virtual_number]]',
    USER_COMPANY: '[[company]]',
    USER_SIGNATURE: '[[my_signature]]',
    USER_APPOINTMENT_URL: '[[appointment_url]]',
};

const contactPersonalizeTagConstant = {
    CONTACT_FIRST_NAME: '[[first_name]]',
    CONTACT_LAST_NAME: '[[last_name]]',
    CONTACT_EMAIL: '[[email]]',
    CONTACT_PHONE_NUMBER: '[[contact_phone_number]]',
    CONTACT_COUNTRY: '[[contact_country]]',
    CONTACT_STATE: '[[contact_state]]',
    CONTACT_CITY: '[[contact_city]]',
    CONTACT_STREET_ADDRESS: '[[contact_street_address]]',
    CONTACT_COMPANY_NAME: '[[contact_company_name]]',
    CONTACT_URL: '[[contact_url]]',
    CONTACT_ZIP_CODE: '[[contact_zip_code]]',
    CONTACT_DEAL_VALUE: '[[contact_deal_value]]',
    CONTACT_BIRTH_DATE: '[[contact_birth_date]]',
    CONTACT_ANNIVERSARY_DATE: '[[contact_anniversary_date]]',
};

const datePersonalizeTagConstant = {
    DATE_TODAY: '[[today]]',
    DATE_TOMORROW: '[[tomorrow]]',
};

const agencyPersonalizeTagConstant = {
    AGENCY_FULL_NAME: '[[agency_full_name]]',
};

const personalizeTagReplaceType = {
    PERSONALIZE_TAG_REPLACE_TYPE_SUBJECT: 1,
    PERSONALIZE_TAG_REPLACE_TYPE_BODY: 2,
};

const thirdPartyCredentials = {
    THIRD_PARTY_CREDINTIALS_IS_DEFAULT_YES: 1,
    THIRD_PARTY_CREDINTIALS_IS_DEFAULT_NO: 1,

    THIRD_PARTY_CREDINTIALS_SENDGRID: 'SENDGRID',
    THIRD_PARTY_CREDINTIALS_POSTMARK: 'POSTMARK',
    THIRD_PARTY_CREDINTIALS_ZENDIRECT: 'ZENDIRECT',
};
export {
    agencyCreditSettings,
    agencySettingConstant,
    clientCanSeeConstant,
    invoiceConstant,
    invoicePaymentConstant,
    invoiceSendingQueuesConstant,
    redisConstant,
    reminderSettingConstant,
    templateConstant,
    userConstant,
    virtualNumberConstant,
    invoiceTemplateConstant,
    clientCanSeeDefaultConstant,
    userPersonalizeTagConstant,
    contactPersonalizeTagConstant,
    datePersonalizeTagConstant,
    agencyPersonalizeTagConstant,
    personalizeTagReplaceType,
    thirdPartyCredentials,
};
