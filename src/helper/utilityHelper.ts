import {
    agencyPersonalizeTagConstant,
    contactPersonalizeTagConstant,
    datePersonalizeTagConstant,
    personalizeTagReplaceType,
    reminderSettingConstant,
    userPersonalizeTagConstant,
} from '../config/constant';
import { logger } from '../config/logger';

export const encodeToBase64 = (string) => Buffer.from(string).toString('base64');

export const decodeToAscii = (encodedString) =>
    Buffer.from(encodedString, 'base64').toString('ascii');

export const sleep = (ms: number) =>
    new Promise((resolve) => {
        // eslint-disable-next-line no-promise-executor-return
        setTimeout(resolve, ms);
    });

// utilityHelper.ts
export function generateInvoiceNumber() {
    const prefix = 'INV';
    const uniqueId = Math.floor(Math.random() * 900) + 100; // Generate a random 5-digit number
    const timestamp = Date.now();
    const invoiceNumber = `${prefix}-${uniqueId}-${timestamp}`;
    return invoiceNumber;
}

// Random pdf name generate
export function generatePdfName(name) {
    const prefix = `PDF_${name}`;
    const timestamp = Date.now();
    const invoiceNumber = `${prefix}-${timestamp}`;
    return invoiceNumber;
}

// Random file name generate
export function generateFileName(name, extension) {
    const prefix = name;
    const timestamp = Date.now();
    const invoiceNumber = `${prefix}-${timestamp}${extension}`;
    return invoiceNumber;
}

// Convert to time 24 hours and format should be Y-m-d H:i:s
export function dateTimeFormat24hours(nextDate, hours) {
    // {
    //     "recurringCycle": "YEARLY",//DAILY, MONTHLY, WEEKLY
    //     "automaticRecurring": true,
    //     "sendEvery": 10,
    //     "sentAt": "22, // sendAt should be  (1-24 time format)
    //     "dayOfSent": "SUN",//['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
    //     "dateOfSent": "2", // dateOfSent should be 1 - 30
    //     "monthOfSent": "3" // (1 - 12)
    // }

    // Extract the time from the recurringSetting
    // const sendTime = time.toLowerCase();
    // const timeParts = sendTime.match(/(\d+)(?::(\d\d))?(\w+)/);
    // let hours = parseInt(timeParts[1], 10);
    // const minutes = parseInt(timeParts[2], 10) || 0;
    // const meridiem = timeParts[3];

    // Convert to 24-hour format
    // if (meridiem === 'pm' && hours < 12) {
    //     hours += 12;
    // } else if (meridiem === 'am' && hours === 12) {
    //     hours = 0;
    // }
    const minutes = 0;
    // Set the time on the nextDate
    nextDate.setHours(hours, minutes, 0, 0); // hours, Minutes

    // Format the next send date as "DD-MM-YYYY HH:mm:ss"
    const day = nextDate.getDate().toString().padStart(2, '0');
    const month = (nextDate.getMonth() + 1).toString().padStart(2, '0');
    const year = nextDate.getFullYear();
    const hours24 = nextDate.getHours().toString().padStart(2, '0');
    const minutesFormatted = nextDate.getMinutes().toString().padStart(2, '0');
    const secondsFormatted = nextDate.getSeconds().toString().padStart(2, '0');

    const formattedNextSendDate = `${year}-${month}-${day} ${hours24}:${minutesFormatted}:${secondsFormatted}`;

    return formattedNextSendDate;
}

// format should be Y-m-d H:i:s
export function formatDate(nextDate) {
    // Format the next send date as "DD-MM-YYYY HH:mm:ss"
    const day = nextDate.getDate().toString().padStart(2, '0');
    const month = (nextDate.getMonth() + 1).toString().padStart(2, '0');
    const year = nextDate.getFullYear();
    const hours24 = nextDate.getHours().toString().padStart(2, '0');
    const minutesFormatted = nextDate.getMinutes().toString().padStart(2, '0');
    const secondsFormatted = nextDate.getSeconds().toString().padStart(2, '0');

    const formattedNextSendDate = `${year}-${month}-${day} ${hours24}:${minutesFormatted}:${secondsFormatted}`;

    return formattedNextSendDate;
}

// format should be Y-m-d
export function extractDateFromDateObject(dateObject) {
    return dateObject.toISOString().split('T')[0];
}

/*
 * Make message with personalize tag replace with data
 * Author: @mohiorangetoolz
 * Return: String (Full converted message)
 */
export function personalizedTagSetup(message, data) {
    const tags = {
        TotalPrice: '[[total_price]]', // total_amount from invoice table
        TotalTax: '[[total_tax]]', // tax_per_unit from invoice_items table (not include)
        TotalDiscount: '[[total_discount]]', // discount_amount from invoices table
        ShippingCharge: '[[shipping_charge]]', // shipping_charge from invoices table
        InvoiceNumber: '[[invoice_number]]', // invoice_number from invoices table
        OrderNumber: '[[order_number]]', // order_number from invoice_contacts table
        StartDate: '[[start_date]]', // submission_date from invoices table
        DueDate: '[[due_date]]', // due_date from invoices table
        Email: '[[email]]', // email from contacts table
        Phone: '[[phone]]', // phone from contacts table
        Name: '[[name]]', // name from contacts table
        PaymentLink: '[[payment_link]]',
        PreviousInvoice: '[[previous_unpaid_invoice_link]]',
    };

    let formattedMessage = message;
    const staticUrl = data.PaymentLink; // Replace with your desired static URL

    if (!formattedMessage.includes('[[payment_link]]')) {
        // Replace with data.PaymentLink if payment link tag not found
        formattedMessage += ` ${staticUrl}`;
    }

    Object.entries(tags).forEach(([key, value]) => {
        const escapedValue = value.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
        const regex = new RegExp(escapedValue, 'g');
        formattedMessage = formattedMessage.replace(
            regex,
            data[key] !== undefined ? data[key] : ''
        );
    });

    return formattedMessage;
}

export function personalizedTagSetupForSubject(message, data) {
    const tags = {
        TotalPrice: '[[total_price]]', // total_amount from invoice table
        TotalTax: '[[total_tax]]', // tax_per_unit from invoice_items table (not include)
        TotalDiscount: '[[total_discount]]', // discount_amount from invoices table
        ShippingCharge: '[[shipping_charge]]', // shipping_charge from invoices table
        InvoiceNumber: '[[invoice_number]]', // invoice_number from invoices table
        OrderNumber: '[[order_number]]', // order_number from invoice_contacts table
        StartDate: '[[start_date]]', // submission_date from invoices table
        DueDate: '[[due_date]]', // due_date from invoices table
        Email: '[[email]]', // email from contacts table
        Phone: '[[phone]]', // phone from contacts table
        Name: '[[name]]', // name from contacts table
        PaymentLink: '[[payment_link]]',
    };

    let formattedMessage = message;

    Object.entries(tags).forEach(([key, value]) => {
        const escapedValue = value.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
        const regex = new RegExp(escapedValue, 'g');
        formattedMessage = formattedMessage.replace(
            regex,
            data[key] !== undefined ? data[key] : ''
        );
    });

    return formattedMessage;
}

export function previousInvoiceLinkHtml(data, index, baseUrl) {
    const url = `https://${baseUrl}/invoice/payment/${data.agency_id}/${data.id}`;
    const html = `
    <p>Link ${index + 1}: <a href="${url}">Payment Link</a> <span>Due amount: ${
        data.total_amount
    }</span> 
    <a href="${data.pdf_url}">Download pdf</a> </p>`;
    return html;
}

export function getFullName(firstName: string, lastName: string, defaultValue = 'N/A') {
    let fullName = '';
    if (firstName) fullName += `${firstName} `;
    if (lastName) fullName += lastName;
    return fullName || defaultValue;
}

export function urlify(text) {
    try {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.replace(urlRegex, '<a href="$1" target="_blank">$1</a>');
    } catch (err) {
        return text;
    }
}

export function countCharacterForTexts(text: string) {
    const count = text.length;
    if (count === 0) return 1;

    const bar = [160, 310, 460, 610, 760, 910, 1060, 1210, 1360, 1500];
    const entries = Object.entries(bar);
    let preValue = 0;

    const result = entries
        .map(([key, value]) => {
            const intValue = parseInt(key, 10);
            if (count > preValue && count <= value) {
                return intValue + 1;
            }
            preValue = value;
            return null;
        })
        .filter((value) => value !== null);

    return result[0]; // Return the first non-null value
}

export function followUpMessageForMessage() {
    const followUpMessageForMessageValue = `Dear [[contact_name]], your invoice for [[total_price]] is due to make payment. Please visit the link to make payments, [[payment_link]]. Thank you.`;
    return followUpMessageForMessageValue;
}

export function followUpMessageForSubject() {
    const followUpMessageForEmailValue = `Invoice due payments [[invoice_number]]`;
    return followUpMessageForEmailValue;
}

export function followUpMessageForEmail() {
    const followUpMessageForEmailValue = `<p>Hello [[name]],</p>
    <p>I hope that you are well. I am contacting you with regard to the following invoice:</p>
    
    <p><strong>Invoice Number:</strong> [[invoice_number]]</p>
    <p><strong>Invoice Amount:</strong> [[total_price]]</p>
    <p><strong>Due Date:</strong> [[due_date]]</p>
    
    <p>Please click the link to make payments: <a href="[[payment_link]]">Invoice Payment</a></p>
    
    [[previous_unpaid_invoice_link]]
    
    <p>I have attached a copy of the invoice for your reference.</p>
    
    <p>Thank you.</p>`;
    return followUpMessageForEmailValue;
}

export function personalizedReplace(
    messageBody: any,
    data: any,
    user: any,
    contactInfo: any,
    fromNumber: string | number,
    customFields: any,
    userPersonalizedFields: any,
    personalizeType: number,
    paymentMethod: any,
    pdf_url: any = '',
    contentType: any = null
) {
    let formattedMessage = messageBody;
    const tags = {
        // INVOICE RELATED TAG
        TotalPrice: '[[total_price]]', // total_amount from invoice table
        TotalTax: '[[total_tax]]', // tax_per_unit from invoice_items table (not include)
        TotalDiscount: '[[total_discount]]', // discount_amount from invoices table
        ShippingCharge: '[[shipping_charge]]', // shipping_charge from invoices table
        InvoiceNumber: '[[invoice_number]]', // invoice_number from invoices table
        OrderNumber: '[[order_number]]', // order_number from invoice_contacts table
        StartDate: '[[start_date]]', // submission_date from invoices table
        DueDate: '[[due_date]]', // due_date from invoices table
        PaymentLink: '[[payment_link]]',
        PreviousInvoice: '[[previous_unpaid_invoice_link]]',
        // CONTACT RELATED TAG
        ContactFirstName: contactPersonalizeTagConstant.CONTACT_FIRST_NAME, // first_name from contacts table
        ContactLastName: contactPersonalizeTagConstant.CONTACT_LAST_NAME, // last_name from contacts table
        ContactEmail: contactPersonalizeTagConstant.CONTACT_EMAIL, // email from contacts table
        ContactPhone: contactPersonalizeTagConstant.CONTACT_PHONE_NUMBER, // phone from contacts table
        ContactCountry: contactPersonalizeTagConstant.CONTACT_COUNTRY, // country from contacts table
        ContactState: contactPersonalizeTagConstant.CONTACT_STATE, // state from contacts table
        ContactCity: contactPersonalizeTagConstant.CONTACT_CITY, // city from contacts table
        ContactStreetAddress: contactPersonalizeTagConstant.CONTACT_STREET_ADDRESS, // address from contacts table
        ContactCompanyName: contactPersonalizeTagConstant.CONTACT_COMPANY_NAME, // company_name from contacts table
        ContactUrl: contactPersonalizeTagConstant.CONTACT_URL, // url from contacts table
        ContactZipCode: contactPersonalizeTagConstant.CONTACT_ZIP_CODE, // zip from contacts table
        ContactDealValue: contactPersonalizeTagConstant.CONTACT_DEAL_VALUE, // deal_value from contacts table
        ContactBirthDate: contactPersonalizeTagConstant.CONTACT_BIRTH_DATE, // birth_date from contacts table
        ContactAnniversaryDate: contactPersonalizeTagConstant.CONTACT_ANNIVERSARY_DATE, // anniversary_date from contacts table
        // USER RELATED TAG
        UserName: userPersonalizeTagConstant.USER_NAME, // full_name from users table
        UserFirstName: userPersonalizeTagConstant.USER_FIRST_NAME, // full_name from users table
        UserLastName: userPersonalizeTagConstant.USER_LAST_NAME, // full_name from users table
        UserEmail: userPersonalizeTagConstant.USER_EMAIL, // email from users table
        UserPhone: userPersonalizeTagConstant.USER_PHONE, // phone from users table
        UserVirtualNumber: userPersonalizeTagConstant.USER_VIRTUAL_NUMBER, // from number
        UserCompany: userPersonalizeTagConstant.USER_COMPANY, // company_name from users table
        UserSignature: userPersonalizeTagConstant.USER_SIGNATURE, // signature from users table
        UserAppointmentUrl: userPersonalizeTagConstant.USER_APPOINTMENT_URL, // appointment_url from users table
        // DATE RELATED TAG
        DateToday: datePersonalizeTagConstant.DATE_TODAY, // date of today
        DateTomorrow: datePersonalizeTagConstant.DATE_TOMORROW, // date of tomorrow
        // AGENCY RELATED TAG
        AgencyFullName: agencyPersonalizeTagConstant.AGENCY_FULL_NAME, // full_name from agencies table
    };

    const staticUrl = data.PaymentLink; // Replace with your desired static URL
    let paymentUrl = `<a href="${staticUrl}"> Payment </a>`;

    // If content type is sms it should exclude any html tag.
    if (contentType === reminderSettingConstant.CONTENT_TYPE__SMS) {
        paymentUrl = `${staticUrl}`;
    }

    if (paymentMethod[0] === 0) {
        // paymentUrl = `<p style="color: #1068C9"> <strong> "Only Manual Payment Accepted" </strong> </p>`;
        paymentUrl = `<a href="${pdf_url ?? ''}">View Invoice</a>`;

        // If content type is sms it should exclude any html tag.
        if (contentType === reminderSettingConstant.CONTENT_TYPE__SMS) {
            paymentUrl = `${pdf_url}`;
        }
    }

    if (personalizeType === personalizeTagReplaceType.PERSONALIZE_TAG_REPLACE_TYPE_BODY) {
        if (!formattedMessage.includes('[[payment_link]]')) {
            // Replace with data.PaymentLink if payment link tag not found
            formattedMessage += `${paymentUrl}`;
        }
    }

    Object.entries(tags).forEach(([key, value]) => {
        const escapedValue = value.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
        const regex = new RegExp(escapedValue, 'g');

        if (value === '[[payment_link]]') {
            formattedMessage = formattedMessage.replace(
                regex,
                data[key] !== undefined && data[key] !== null ? `${paymentUrl}` : ''
            );
        } else if (value === '[[total_price]]') {
            formattedMessage = formattedMessage.replace(
                regex,
                data[key] !== undefined && data[key] !== null ? `$${data[key]}` : ''
            );
        } else if (value === '[[total_tax]]') {
            formattedMessage = formattedMessage.replace(
                regex,
                data[key] !== undefined && data[key] !== null ? `$${data[key]}` : ''
            );
        } else if (value === '[[total_discount]]') {
            formattedMessage = formattedMessage.replace(
                regex,
                data[key] !== undefined && data[key] !== null ? `$${data[key]}` : ''
            );
        } else if (value === '[[shipping_charge]]') {
            formattedMessage = formattedMessage.replace(
                regex,
                data[key] !== undefined && data[key] !== null ? `$${data[key]}` : ''
            );
        } else {
            formattedMessage = formattedMessage.replace(
                regex,
                data[key] !== undefined && data[key] !== null ? data[key] : ''
            );
        }
    });

    if (customFields) {
        customFields.forEach((field) => {
            formattedMessage = formattedMessage.replace(
                field?.dataValues?.user_custom_fields?.personalize_tag,
                field.value && field.value !== null ? field.value : ''
            );
        });
    }

    if (userPersonalizedFields) {
        userPersonalizedFields.forEach((field) => {
            formattedMessage = formattedMessage.replace(
                field.personalize_tag,
                field.value && field.value !== null ? field.value : ''
            );
        });
    }

    return formattedMessage;
}

export function agencyPersonalizeTagArray() {
    return [
        {
            field_label: 'Agency Full Name',
            value: agencyPersonalizeTagConstant.AGENCY_FULL_NAME,
        },
    ];
}

export function datePersonalizeTagArray() {
    return [
        {
            field_label: 'Today Date',
            value: datePersonalizeTagConstant.DATE_TODAY,
        },
        {
            field_label: 'Tomorrow Date',
            value: datePersonalizeTagConstant.DATE_TOMORROW,
        },
    ];
}

export function userPersonalizeTagArray() {
    return [
        {
            field_label: 'My virtual number',
            value: userPersonalizeTagConstant.USER_VIRTUAL_NUMBER,
        },
        {
            field_label: 'My Company',
            value: userPersonalizeTagConstant.USER_COMPANY,
        },
        {
            field_label: 'My Name',
            value: userPersonalizeTagConstant.USER_NAME,
        },
        {
            field_label: 'My First Name',
            value: userPersonalizeTagConstant.USER_FIRST_NAME,
        },
        {
            field_label: 'My Last Name',
            value: userPersonalizeTagConstant.USER_LAST_NAME,
        },
        {
            field_label: 'My Phone',
            value: userPersonalizeTagConstant.USER_PHONE,
        },
        {
            field_label: 'My Signature',
            value: userPersonalizeTagConstant.USER_SIGNATURE,
        },
        {
            field_label: 'My Appointment URL',
            value: userPersonalizeTagConstant.USER_APPOINTMENT_URL,
        },
        {
            field_label: 'My Email',
            value: userPersonalizeTagConstant.USER_EMAIL,
        },
    ];
}

export function contactPersonalizeTagArray() {
    return [
        {
            field_label: 'FIRST NAME',
            value: contactPersonalizeTagConstant.CONTACT_FIRST_NAME,
        },
        {
            field_label: 'LAST NAME',
            value: contactPersonalizeTagConstant.CONTACT_LAST_NAME,
        },
        {
            field_label: 'CONTACT EMAIL',
            value: contactPersonalizeTagConstant.CONTACT_EMAIL,
        },
        {
            field_label: 'Contact Phone Number',
            value: contactPersonalizeTagConstant.CONTACT_PHONE_NUMBER,
        },
        {
            field_label: 'Property Country',
            value: contactPersonalizeTagConstant.CONTACT_COUNTRY,
        },
        {
            field_label: 'Property State',
            value: contactPersonalizeTagConstant.CONTACT_STATE,
        },
        {
            field_label: 'Contact City',
            value: contactPersonalizeTagConstant.CONTACT_CITY,
        },
        {
            field_label: 'Property Street Address',
            value: contactPersonalizeTagConstant.CONTACT_STREET_ADDRESS,
        },
        {
            field_label: 'Contact Company Name',
            value: contactPersonalizeTagConstant.CONTACT_COMPANY_NAME,
        },
        {
            field_label: 'Property URL',
            value: contactPersonalizeTagConstant.CONTACT_URL,
        },
        {
            field_label: 'Property Zip Code',
            value: contactPersonalizeTagConstant.CONTACT_ZIP_CODE,
        },
        {
            field_label: 'Contact Deal Value',
            value: contactPersonalizeTagConstant.CONTACT_DEAL_VALUE,
        },
        {
            field_label: 'Contact Birth Date',
            value: contactPersonalizeTagConstant.CONTACT_BIRTH_DATE,
        },
        {
            field_label: 'Contact Anniversary Date',
            value: contactPersonalizeTagConstant.CONTACT_ANNIVERSARY_DATE,
        },
    ];
}

export function invoicePersonalizeTagArray() {
    return [
        { value: '[[total_price]]', field_label: 'Total Price' },
        { value: '[[total_tax]]', field_label: 'Total Tax' },
        { value: '[[total_discount]]', field_label: 'Total Discount' },
        { value: '[[shipping_charge]]', field_label: 'Shipping Charge' },
        { value: '[[invoice_number]]', field_label: 'Invoice Number' },
        { value: '[[order_number]]', field_label: 'Order Number' },
        { value: '[[start_date]]', field_label: 'Start Date' },
        { value: '[[due_date]]', field_label: 'Due Date' },
        { value: '[[payment_link]]', field_label: 'Payment Link' },
        {
            value: '[[previous_unpaid_invoice_link]]',
            field_label: 'Previous Unpaid Invoice Link',
        },
    ];
}

export function defaultReminderSettingArray() {
    return [
        // Email default reminder settings
        {
            title: 'Reminder for Sent Invoices - Due in 3 Days',
            priority: 1,
            day: 3,
            subject: 'Your invoice from [[company]] is due in 3 days',
            message: defaultEmailReminderSettingBeforeDayThreeMessage(),
            status: reminderSettingConstant.REMINDER_SETTING_STATUS_TYPE_ACTIVE,
            content_type: reminderSettingConstant.CONTENT_TYPE__EMAIL,
            schedule_type: reminderSettingConstant.SCHEDULE_TYPE__BEFORE,
            address_type: reminderSettingConstant.REMINDER_SETTING_ADDRESS_TYPE_CUSTOMER_AND_ME,
        },
        {
            title: 'Reminder for Sent Invoices - Due in 1 Day',
            priority: 2,
            day: 1,
            subject: 'Your invoice from [[company]] is due tomorrow',
            message: defaultEmailReminderSettingBeforeDayOneMessage(),
            status: reminderSettingConstant.REMINDER_SETTING_STATUS_TYPE_ACTIVE,
            content_type: reminderSettingConstant.CONTENT_TYPE__EMAIL,
            schedule_type: reminderSettingConstant.SCHEDULE_TYPE__BEFORE,
            address_type: reminderSettingConstant.REMINDER_SETTING_ADDRESS_TYPE_CUSTOMER_AND_ME,
        },
        {
            title: 'Reminder for Sent Invoices - Due Today',
            priority: 3,
            day: 0,
            subject: 'Your invoice from [[company]] is due today',
            message: defaultEmailReminderSettingBeforeDayZeroMessage(),
            status: reminderSettingConstant.REMINDER_SETTING_STATUS_TYPE_ACTIVE,
            content_type: reminderSettingConstant.CONTENT_TYPE__EMAIL,
            schedule_type: reminderSettingConstant.SCHEDULE_TYPE__AFTER,
            address_type: reminderSettingConstant.REMINDER_SETTING_ADDRESS_TYPE_CUSTOMER_AND_ME,
        },
        {
            title: 'Reminder for Past Due Invoices - 1 Day Past Due',
            priority: 4,
            day: 1,
            subject: 'Your invoice from [[company]] is currently past due',
            message: defaultEmailReminderSettingAfterDayOneMessage(),
            status: reminderSettingConstant.REMINDER_SETTING_STATUS_TYPE_ACTIVE,
            content_type: reminderSettingConstant.CONTENT_TYPE__EMAIL,
            schedule_type: reminderSettingConstant.SCHEDULE_TYPE__AFTER,
            address_type: reminderSettingConstant.REMINDER_SETTING_ADDRESS_TYPE_CUSTOMER_AND_ME,
        },
        {
            title: 'Reminder for Past Due Invoices - 7 Days Past Due',
            priority: 5,
            day: 7,
            subject: 'Your invoice from [[company]] - 7 days past due',
            message: defaultEmailReminderSettingAfterDaySevenMessage(),
            status: reminderSettingConstant.REMINDER_SETTING_STATUS_TYPE_ACTIVE,
            content_type: reminderSettingConstant.CONTENT_TYPE__EMAIL,
            schedule_type: reminderSettingConstant.SCHEDULE_TYPE__AFTER,
            address_type: reminderSettingConstant.REMINDER_SETTING_ADDRESS_TYPE_CUSTOMER_AND_ME,
        },
        {
            title: 'Reminder for Past Due Invoices - 30 Days Past Due',
            priority: 6,
            day: 30,
            subject: 'Your invoice from [[company]] - 30 days past due',
            message: defaultEmailReminderSettingAfterDayThirtyMessage(),
            status: reminderSettingConstant.REMINDER_SETTING_STATUS_TYPE_ACTIVE,
            content_type: reminderSettingConstant.CONTENT_TYPE__EMAIL,
            schedule_type: reminderSettingConstant.SCHEDULE_TYPE__AFTER,
            address_type: reminderSettingConstant.REMINDER_SETTING_ADDRESS_TYPE_CUSTOMER_AND_ME,
        },
        // Sms default reminder settings
        {
            title: 'Reminder for Sent Invoices - Due in 3 Days',
            priority: 1,
            day: 3,
            subject: null,
            message: defaultSmsReminderSettingBeforeDayThreeMessage(),
            status: reminderSettingConstant.REMINDER_SETTING_STATUS_TYPE_ACTIVE,
            content_type: reminderSettingConstant.CONTENT_TYPE__SMS,
            schedule_type: reminderSettingConstant.SCHEDULE_TYPE__BEFORE,
            address_type: reminderSettingConstant.REMINDER_SETTING_ADDRESS_TYPE_CUSTOMER_AND_ME,
        },
        {
            title: 'Reminder for Sent Invoices - Due in 1 Day',
            priority: 2,
            day: 1,
            subject: null,
            message: defaultSmsReminderSettingBeforeDayOneMessage(),
            status: reminderSettingConstant.REMINDER_SETTING_STATUS_TYPE_ACTIVE,
            content_type: reminderSettingConstant.CONTENT_TYPE__SMS,
            schedule_type: reminderSettingConstant.SCHEDULE_TYPE__BEFORE,
            address_type: reminderSettingConstant.REMINDER_SETTING_ADDRESS_TYPE_CUSTOMER_AND_ME,
        },
        {
            title: 'Reminder for Sent Invoices - Due Today',
            priority: 3,
            day: 0,
            subject: null,
            message: defaultSmsReminderSettingBeforeDayZeroMessage(),
            status: reminderSettingConstant.REMINDER_SETTING_STATUS_TYPE_ACTIVE,
            content_type: reminderSettingConstant.CONTENT_TYPE__SMS,
            schedule_type: reminderSettingConstant.SCHEDULE_TYPE__AFTER,
            address_type: reminderSettingConstant.REMINDER_SETTING_ADDRESS_TYPE_CUSTOMER_AND_ME,
        },
        {
            title: 'Reminder for Past Due Invoices - 1 Day Past Due',
            priority: 4,
            day: 1,
            subject: null,
            message: defaultSmsReminderSettingAfterDayOneMessage(),
            status: reminderSettingConstant.REMINDER_SETTING_STATUS_TYPE_ACTIVE,
            content_type: reminderSettingConstant.CONTENT_TYPE__SMS,
            schedule_type: reminderSettingConstant.SCHEDULE_TYPE__AFTER,
            address_type: reminderSettingConstant.REMINDER_SETTING_ADDRESS_TYPE_CUSTOMER_AND_ME,
        },
        {
            title: 'Reminder for Past Due Invoices -7 Days Past Due',
            priority: 5,
            day: 7,
            subject: null,
            message: defaultSmsReminderSettingAfterDaySevenMessage(),
            status: reminderSettingConstant.REMINDER_SETTING_STATUS_TYPE_ACTIVE,
            content_type: reminderSettingConstant.CONTENT_TYPE__SMS,
            schedule_type: reminderSettingConstant.SCHEDULE_TYPE__AFTER,
            address_type: reminderSettingConstant.REMINDER_SETTING_ADDRESS_TYPE_CUSTOMER_AND_ME,
        },
        {
            title: 'Reminder for Past Due Invoices - 30 Days Past Due',
            priority: 6,
            day: 30,
            subject: null,
            message: defaultSmsReminderSettingAfterDayThirtyMessage(),
            status: reminderSettingConstant.REMINDER_SETTING_STATUS_TYPE_ACTIVE,
            content_type: reminderSettingConstant.CONTENT_TYPE__SMS,
            schedule_type: reminderSettingConstant.SCHEDULE_TYPE__AFTER,
            address_type: reminderSettingConstant.REMINDER_SETTING_ADDRESS_TYPE_CUSTOMER_AND_ME,
        },
    ];
}

export function defaultEmailReminderSettingBeforeDayThreeMessage() {
    return `Hi [[first_name]],

    Your invoice from [[company]] is due in 3 days.
    
    Here is a quick summary:
    
    Invoice #: [[invoice_number]]
    
    Amount Due: [[total_price]]
    
    Due Date: [[due_date]]
    
    [[payment_link]]
    
    
    
    Regards,
    
    [[my_signature]]`;
}

export function defaultEmailReminderSettingBeforeDayOneMessage() {
    return `Hi [[first_name]],

    Your invoice from [[company]] is due tomorrow.
    
    Here is a quick summary:
    
    Invoice #: [[invoice_number]]
    
    Amount Due: [[total_price]]
    
    Due Date: [[due_date]]
    
    [[payment_link]]
    
    
    
    Regards,
    
    [[my_signature]]`;
}

export function defaultEmailReminderSettingBeforeDayZeroMessage() {
    return `Hi [[first_name]],

    Your invoice from [[company]] is due today.
    
    Here is a quick summary:
    
    Invoice #: [[invoice_number]]
    
    Amount Due: [[total_price]]
    
    Due Date: [[due_date]]
    
    [[payment_link]]
    
    
    
    Regards,
    
    [[my_signature]]`;
}

export function defaultEmailReminderSettingAfterDayOneMessage() {
    return `Hi [[first_name]],

    Your invoice from [[company]] is currently past due.
    
    Here is a quick summary:
    
    Invoice #: [[invoice_number]]
    
    Amount Due: [[total_price]]
    
    Due Date: [[due_date]]
    
    [[payment_link]]
    
    
    
    Regards,
    
    [[my_signature]]`;
}

export function defaultEmailReminderSettingAfterDaySevenMessage() {
    return `Hi [[first_name]],

    Your invoice from [[company]] is currently 7 days past due.
    
    Here is a quick summary:
    
    Invoice #: [[invoice_number]]
    
    Amount Due: [[total_price]]
    
    Due Date: [[due_date]]
    
    [[payment_link]]
    
    
    
    Regards,
    
    [[my_signature]]`;
}

export function defaultEmailReminderSettingAfterDayThirtyMessage() {
    return `Hi [[first_name]],

    Your invoice from [[company]] is currently 30 days past due.
    
    Here is a quick summary:
    
    Invoice #: [[invoice_number]]
    
    Amount Due: [[total_price]]
    
    Due Date: [[due_date]]
    
    [[payment_link]]
    
    
    
    Regards,
    
    [[my_signature]]`;
}

export function defaultSmsReminderSettingBeforeDayThreeMessage() {
    return `Hi [[first_name]] your invoice from [[company]] for [[total_price]] is due in 3 days. View invoice: [[payment_link]]`;
}

export function defaultSmsReminderSettingBeforeDayOneMessage() {
    return `Hi [[first_name]] your invoice from [[company]] for [[total_price]] is due tomorrow. View invoice: [[payment_link]]`;
}

export function defaultSmsReminderSettingBeforeDayZeroMessage() {
    return `Hi [[first_name]] your invoice from [[company]] for [[total_price]] is due today. View invoice: [[payment_link]]`;
}

export function defaultSmsReminderSettingAfterDayOneMessage() {
    return `Hi [[first_name]] your invoice from [[company]] for [[total_price]] is currently past due. View invoice: [[payment_link]]`;
}

export function defaultSmsReminderSettingAfterDaySevenMessage() {
    return `Hi [[first_name]] your invoice from [[company]] for [[total_price]] is currently 7 days past due. View invoice: [[payment_link]]`;
}

export function defaultSmsReminderSettingAfterDayThirtyMessage() {
    return `Hi [[first_name]] your invoice from [[company]] for [[total_price]] is currently 30 days past due. View invoice: [[payment_link]]`;
}

export function defaultEmailTemplateMessage() {
    return `<p>Hi [[first_name]],<br />Thank you for your business! You have a new invoice ready for payment.<br /><br />Here is a quick summary:<br /><br /><strong>Invoice#: [[invoice_number]]</strong><br /><strong>Amount Due: [[total_price]]</strong><br /><strong>Due Date: [[due_date]]</strong><br /><br />[[payment_link]]<br /><br /><br />Regards,<br />[[my_signature]]</p>`;
}

export function defaultSmsTemplateMessage() {
    return `Hi [[first_name]]. [[company]] just sent you an invoice for [[total_price]]. View now: [[payment_link]]`;
}

export const formatUSNumber = (number: string) => {
    if (number) {
        const cleaned = `${number}`.replace(/\D/g, '');
        const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            const intlCode = match[1] ? '+1 ' : '';
            return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
        }
        // return number.replace(/[. \-+()]/g, "");
        return cleaned.replace(/[. \-+()]/g, '');
    }
    return number;
};

export const capitalizeWords = (str: string) => {
    const capitalizeWord = str.replace(/\b\w/g, (char) => char.toUpperCase());
    return capitalizeWord;
};

// export const capitalizeWords = (str) => {
//     return str.replace(/\b\w/g, char => char.toUpperCase());
// };
