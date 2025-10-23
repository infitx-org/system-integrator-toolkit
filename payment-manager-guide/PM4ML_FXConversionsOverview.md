# FX Conversions Overview Guide

The FX Conversions Overview page provides visualization of conversion details and the ability to query and observe each conversion's status.

![Conversions Overview](/images/conversion_overview_.png)

<div style="page-break-after: always"></div>

## Find a conversion
The **Find a Conversion** button find a conversion button at the top of the page allows you to find a particular conversion.

On clicking the button, a window is displayed where you can:
- search for a conversion by its Conversion ID
- do advanced filtering using multiple search criteria (this is useful when you do not have a Conversion ID at your disposal)

### Find a conversion based on its Conversion ID
Use the Basic Find a Conversion tab to find a conversion based on its Conversion ID:
1. Enter the conversion’s identifier in the **Conversion ID** field. Entering only a snippet of the full conversion ID string will also return a result.
1. Click the **Find Conversions** button.
1. To find out more information about the conversion, click the conversion item once.
The **Conversion Details** window pops up showing detailed information about the conversion.

### Conversion Details
The details of the conversion are available on the conversion details tab.

![Conversion details](/images/conversion_details.png)

- **Determining conversion ID:** The unique identifier of the conversion that initiated this conversion (for example, 01N42FN27XAXPJXKNKULB4).
- **Conversion ID:** The unique identifier of the conversion (for example, 01N42FNC2XIXM9TF01).
- **Conversion State:** Indicates the current state of the conversion. Possible values are:
  - **RECEIVED** - Next ledger has received the conversion
  - **RESERVED** - Next ledger has reserved the conversion  
  - **COMMITTED** - Next ledger has successfully performed the conversion
  - **ABORTED** - Next ledger has aborted the conversion due to a rejection or failure to perform the conversion
- **Conversion Request ID:** The unique identifier for the currency conversion request (for example, 01N42FN42YNAJFPJM).
- **Source Amount:** The amount being converted from the source currency (for example, 1).
- **Source Currency:** The currency of the amount being converted from (for example, ZMW).
- **Target Amount:** The amount after conversion to the target currency (for example, 226.69).
- **Target Currency:** The currency of the amount being converted to (for example, MWK).
- **Conversion Submitted:** The date and time when the conversion was submitted (for example, 2025-09-12T07:50:51.267Z).
- **Conversion Type:** The type of conversion being performed (for example, Payer DFSP Conversion).
- **Conversion Institution:** The identifier of the institution handling the conversion (for example, test-fxp).

### Conversion Terms
The Conversion Terms tab displays the financial terms and conditions agreed upon for the currency conversion, including quote information and conversion details.

![Conversion terms](/images/conversion_terms.png)

**Quote Information:**
- **Determining conversion ID:** The unique identifier of the conversion that initiated this conversion (for example, 01N42FDJ1XAMNPXRN).
- **Conversion State:** The current state of the conversion (for example, COMMITTED).
- **Quote Amount:** The amount quoted for the conversion (for example, 10).
- **Quote Currency:** The currency of the quoted amount (for example, ZMW).
- **Quote Amount Type:** The type of quote amount (for example, SEND).

**Conversion Terms:**
- **Source Amount:** The amount in the source currency.  This is a clearing amount and already includes fees.
- **Target Amount:** The equivalent amount in the target currency. This is a clearing amount and already includes fees.
- **Source Charges:** Any charges applied to the source currency amount. This is an information field as it is already included in the source amount.
- **Target Charges:** Any charges applied to the target currency amount. This is an information field as it is already included in the target amount.
- **Exchange Rate:** The exchange rate used for the conversion (for example, 22.6690).
- **Expiry Date Time:** The expiration date and time for the conversion terms (for example, 2025-09-12T09:51:56.526967+02:00).

### Conversion Technical Details
The Technical Details tab provides low-level technical information about the conversion, including various system identifiers and access to detailed message sequences.

![Conversion technical details](/images/conversion_technical_details.png)

**Technical Identifiers:**
- **Determining conversion ID:** The unique identifier of the conversion that initiated this conversion (for example, 01N42FDJ1XAMNPXRCZOACBYO).
- **Conversion ID:** The unique identifier of the conversion (for example, 01N42FENC23DXAUFIQHTQHXE).
- **Conversion Request ID:** The unique identifier for the currency conversion request (for example, 01N42FENC23DXAUFIQHTQHXD).
- **Conversion State:** The current state of the conversion process (for example, COMMITTED).
- **Commit Request ID:** The unique identifier for the commit request.

**View Message Details:**
The tab provides access to view the actual API messages exchanged during the conversion process:
- **FX Quote Request:** View the foreign exchange quote request message sent to request conversion pricing terms.
- **FX Quote Response:** View the foreign exchange quote response message containing the conversion pricing terms.
- **FX conversion Prepare:** View the FX conversion preparation request message sent to initiate the conversion.
- **FX conversion Fulfil:** View the FX conversion fulfillment response message confirming the conversion completion.

### Find a conversion using multiple search criteria
Use the Advanced Filtering tab to find a conversion when you do not know its conversion ID. You can search for a conversion based on:
- the approximate time when the conversion occurred
- the institution (DFSP) that was involved in the conversion
- the status of the conversion


To find a conversion:
1. Use the date picker fields to specify the time period in which the conversion happened. Note that the time of the conversion is the time in your timezone.
1. In the **Contains Institution** field, enter the fspId of the DFSP that participated in the conversion.
1. In the **conversion Status** field, select the appropriate value (Success, Pending, Error) from the drop-down list.
1. Click the **Find conversions** button. A list of conversions that match your search criteria is displayed.
![find a conversion results](/images/find_a_conversion.png)
1. Click an entry in the search results to view details of that particular conversion. The conversion Details window pops up, which displays:
   - A Basic Information tab with details, such as conversion amount, sender, recipient, and so on.
   - A Technical Details tab with low-level technical details, such as the actual party lookup, quote, or conversion messages. This is useful for technical personnel performing a debug.

For further information on the details that the conversion Details pop-up window provides, see the descriptions and screenshots in Find a conversion based on its conversion ID.

<div style="page-break-after: always"></div>

## Successful conversions

The Successful conversions graph is showing a timeline of the past 24 hours and displays the percentage of successful conversions per minute. The time zone of the timeline is UTC.

![successful Conversions](/images/successful_conversions.png)

The granularity of the graph is customizable. For example, you can zoom in on areas of interest and find out the timestamps of conversions that seem not to have been successful.

To be able to zoom, you must be in selection zoom mode. Ensure you have the **Selection Zoom** button ![zoom button](/images/selection_zoom_button.png) selected. This is the default setting.

Click the **Zoom In** or **Zoom Out** buttons ![zoom in or out](/images/zoom_in_zoom_out.png) to zoom in or out. To zoom in on a particular area of the graph, select an area by clicking the graph, drag the mouse left or right, and release the mouse.

Click the **Reset Zoom** button ![Reset Zoom](/images/house_button.png)  to reset the timeline to the original 24-hour granularity.

Another way to change the displayed range of the timeline is to pan an area. Click the **Panning** button ![panning button](/images/panning_button.png), then click the timeline and drag your mouse to the left or right. Panning keeps the selected zoom granularity and lets you move along the X (time) axis.

To return to selection zoom mode, click the Selection Zoom button ![selection zoom button](/images/selection_zoom_button.png).

To download a chart in .svg, .png, or .csv format, click the **Menu** button ![menu button](/images/menu_button.png).

<div style="page-break-after: always"></div>

# Average conversion Time (E2E)
The Average conversion Time (E2E) graph is showing your conversion latency with the Hub.

![Average conversion Time](/images/average_conversions.png)

You can zoom in on particular areas if you spot an anomaly. This is useful when debugging issues.

# Total conversion Statuses
The **Total conversion Statuses** widgets display the total number of successful, pending, and failed conversions.

![total conversion statuses](/images/conversion_statuses.png)

<div style="page-break-after: always"></div>

# Conversions Errors Overview
The **conversions Errors Overview** pie chart shows a breakdown of the types of errors that caused failed conversions.

![conversions errors overview](/images/conversion_errors.png)

The table below the pie chart lists failed conversions. If there are more than four errors, then a **View All Errors** button is displayed, which allows you to check the full list of errors. To get the complete list of errors, click the **View All Errors** button. The **conversions Errors** window pops up.



