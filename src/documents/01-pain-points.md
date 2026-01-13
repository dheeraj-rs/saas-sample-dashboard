# Pain Points - Focusing on Registration

## Things comes up recently

- ability to bulk register and purchase tickets via offline methods
  - offline tickets may or may not habve the user information such as name, email, mobile etc
  - organizers should be able to bulk import offline registration and ticket details including the qr code
  - alternatively, the organizaers can bulk generate tickets and corresponding qr codes for offline use
  - purchase ticket as Complimentary or for a different cost 
- enable buy one get one (BOGO) offer for tickets after a certain date for certain tickets
  - support for similar offers also we should consider
- ticket pre-selction on website itself. once the user landed on the registration app, the ticket selection step should be skipped and should use the pre-selected ticket from website. Also, at any point of time during ordering, if the user goes back to the website and choose another ticket, the registration  flow should reflect that selection, and use it.
  - similarly, we should probably support date and/or venue selection also from the website itself.
- coupons might not be applicable for some tickets (eg: student tickets) which already has heavy discount.
- ticket categories
  - example: gold, silver, basic etc
  - each of them will have different prices and different benefits
  - the price of each category can be based on ticket slabs (early bird, regular, last minute etc)
  - there may or may not be grouped tickets for each of these categories
  - we should be able to stop and start the sale of these categories at any point
  - there may or may not be limitations on the number of total tickets available per category
- each day can have different events (example: dance night, karoke night, musical night)
  - in this case, we might need to provide separate ticket purchase for each day
  - the prices can also differ per day for each category
  - some category might be applicable for specific days only
  - and slabwise price could be there per day per category
  - sometimes, some of the event days could be combined. for example, for a 3 day event, first two days are combined and a single ticket is enough for that. but for the third day, a separate ticket might be needed. 
- there could be scenarios where there could be multiple events on a day (example: standup comedy by John in the morning, standup comedy by Mark in the afternoon, and a musical show at night)
  - in this case, we might need to provide separate ticket for each event on a day
  - the prices can also differ per event in a day
  - some categories might be applicable for specific events and/or days only
  - slabwise price could be there
  - sometimes, some of the events could be combined and a single ticket is needed for that (for example, standup comedies can be combined and for the musical night separate ticket is needed)
- some organizers maybe conducting the same and/or different events at different locations.
  - for example: october 1-3 at sharjah, november 3-5 at abu dhabi, november 25-30 at dubai
  - here also, all scenarios related to tickets can be applicable per location
- ticket booking flow
  - Restrictions
    - First case of restriction is the number of transactions: Whether I can purchase more tickets after initial transaction by logging into my account.
      - whether I can book a different kinds (category/event days/locations) of tickets with a separate transaction.
      - this can maybe applicable to some kind of tickets (category/event days/locations) only
    - Second case of restriction is the number of tickets purchaseable per transaction: Whether I can purchase one ticket only, or more than one ticket in a single transaction. 
      - There could also be a limit on the number of tickets purchaseable per transaction.
      - this can maybe based on the kind of tickets (category/event days/locations)
    - Third case of restriction is the maximum number of tickets purchaseable per user: can be one, can be any number (5, 7, 15 etc) or unlimited
      - this also can maybe based on the kind of tickets (category/event days/locations)
  - User experience (when multiple tickets can be purchased in a single transaction)
    - Scenario 1: Users's need to fill in different information (especially contact details) per ticket
    - Scenario 2: The details of each ticket will be filled by default with current user information. User can optionally choose to edit the details of each ticket if he likes to
    - Scenario 3: Only one set of common information is collected. We only check the count of tickets in this case.
    - Another experience option is the way of adding additional tickets. 
      - add new ticket action
      - plus/minus buttons with count
  - Whether multiple kinds of tickets can be booked in a single transaction. (this can be implemented as a future feature)
- discounts
  - different types of offers
    - buy one get one, buy two get one, buy two get 25% off, buy 3 get 50% off, etc
    - we should be able to start, stop or pause these offers at any point of time
    - we should be able to automatically set availability time also
    - these offers may be based on the kind of tickets (category/event days/locations)
  - coupon codes
    - can be based on percentage or amount
    - can have a limitation on the number of purchaseable using this coupon
    - can be able to start,pause,stop at any time
    - we should be able to automatically set availability time also
    - can be able to increase the limit if needed
    - may be applicable to some kind of tickets (category/event days/locations) only
- addons
  - purchase things like t-shirts, bags etc
  - can be additional benefits such as workshops, seminar etc
  - can be things like breakfast, lunch, dinner, banquet etc
  - can be accomodation, travel facilities etc
  - each of the above can have different options
  - some of these addons can be optional and some can be required

### Registration Requirements

- **No Registration Required:** Users can purchase tickets directly without registering.
- **Registration Required Before Purchase:** Users must register an account or provide details before buying tickets.
- **Optional Registration:** Users can choose to register, but it’s not mandatory.

### Ticket Purchase Types

- **Single Ticket Purchase:** Purchase one ticket per transaction.
- **Multiple Ticket Purchase:** Buy multiple tickets in one transaction.
- **Single Ticket Per User:** Restriction on purchasing more than one ticket per user.
- **Multiple Tickets Per User:** Users can buy more than one ticket, with or without restrictions.
- **Multiple Purchases:** Users can purchase tickets one at a time.

### Ticket Pricing Slabs

- **Early Bird Pricing:** Discounted rates for tickets purchased before a certain date.
- **Regular Pricing:** Standard rates applied after the early bird period.
- **Last-Minute Pricing:** Higher rates closer to the event date.
- **Group Discounts:** Reduced rates for bulk purchases.
- **Custom Ticket Types:** Event organizers can create their own unique ticket types.

### Registration and Ticket Details

- **Basic Information Only:** Collect only essential details (e.g., name, email).
- **Detailed Information per Ticket:** Collect specific details for each ticket purchased (e.g., name, age, dietary preferences).
- **Event-Specific Information:** Ticket type, purchase quantity, preferred seating.
- **Additional Information:** Dietary restrictions, accommodations, emergency contact.
- **Custom Fields:** Variable fields depending on the event's requirements.

### Event Duration and Ticket Options

- **Single-Day Tickets:** Valid for one specific day.
- **Multi-Day Tickets:** Valid for multiple specific days.
- **Combination Tickets:** Valid for a combination of days or sessions.
- **Session-Based Tickets:** Tickets valid for specific sessions within the event.

### Purchase Restrictions

- **Unlimited or Limited:** Users can purchase any number of tickets or have a maximum limit.
- **Per-Person Limits:** Restrict the number of tickets per individual user.
- **Event Capacity:** Manage ticket availability based on overall event capacity.
- **Single Purchase or Multiple Purchases:** Users can purchase all tickets at once or one at a time.

### Ticketing Rules

- **Refunds and Exchanges:** Policies regarding ticket refunds and exchanges.
- **Transferable Tickets:** Allow tickets to be transferred to another person.
- **Non-Transferable Tickets:** Tickets are only valid for the original purchaser.
- **Non-Refundable, Refundable with Fees, or Full Refund:** Different refund policies.
- **Upgradation** Purchase higher cost ticket by adding remaining amount./ or downgrade

### Payment Options

- **Single Payment:** Full payment required at once.
- **Installment Payments:** Option to pay in multiple installments.
- **Discount Codes/Coupons:** Users can apply codes for discounts.

### User Experience Features

- **Event Reminders:** Automated reminders for upcoming events.
- **Ticket Resending:** Option to resend tickets or confirmation emails.
- **Event Updates:** Notifications for changes in event details.

### Multi-Language and Currency Support

- **Language Options:** Support multiple languages for international events.
- **Currency Options:** Support multiple currencies for global ticket purchases.

### New addon's
- option to choose which is the primary user identification mechanism - phone or email
- verification is required or not
- single page checkout
- Session issue - option to configure session duration
- Order of reg process - 
    - registration first, ticket selection second
    - ticket selection first, registration second
    

### Offline payment

- client won't have online mechanisms, they need a way to accept payment via offline methods and record it
- need approval from admin after checking the offline payment details provided by the client.

### Registration restriction

- restrict registration by organization member
  - example: one company named ABC Corp have 400 staff. Only they are allowed to register
- one solution is to get the list of members with name, email, and phone
- another solution is, if the organization provides organization mail id for everyone, we can whitelist the domain part for email id for registration and allow registration only for those with the organization email id.

### Free registration

- no payment gateway needed
- anyone can come and register
- some scenarios might need approval from admin to allow successful registration

### Ticket modification

- upgrade or downgrade category
- Discount during upgrade and download
- add or remove facilities, addons, workshops etc
- add or remove accompanying persons
- add or remove accompanying persons facilities, addons, workshops etc
- configure 
  - how to manage additional payments or refunds
  - if the pricing slab is different, which pricing slab to use
- Full event ticket, daywise or some event wise ticket purchase.