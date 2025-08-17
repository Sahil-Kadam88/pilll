/**
 * Google Apps Script for updating the pill schedule spreadsheet
 * Deploy this as a web app and replace SCHEDULE_WRITE_URL in ScheduleTab.tsx
 * 
 * Spreadsheet ID: 1IoftFv4saUdfgdEVED5k4kKNPbdn6o58TNl6Q3Ln6lE
 */

function doPost(e) {
  try {
    // Get the spreadsheet
    const spreadsheetId = '1IoftFv4saUdfgdEVED5k4kKNPbdn6o58TNl6Q3Ln6lE';
    const sheet = SpreadsheetApp.openById(spreadsheetId).getActiveSheet();
    
    // Parse the request body
    const requestData = JSON.parse(e.postData.contents);
    const morningDose = requestData.morningDose;
    const eveningDose = requestData.eveningDose;
    
    // Update the schedule in row 2 (assuming row 1 has headers)
    // Column A: Morning Dose, Column B: Evening Dose
    sheet.getRange('A2').setValue(morningDose);
    sheet.getRange('B2').setValue(eveningDose);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Schedule updated successfully',
        morningDose: morningDose,
        eveningDose: eveningDose
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  // Optional: Handle GET requests for testing
  return ContentService
    .createTextOutput(JSON.stringify({
      message: 'Schedule updater is running. Use POST to update schedule.'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Setup Instructions:
 * 
 * 1. Go to https://script.google.com/
 * 2. Create a new project
 * 3. Replace the default code with this script
 * 4. Save the project (give it a name like "Pill Schedule Updater")
 * 5. Click "Deploy" > "New deployment"
 * 6. Choose type: "Web app"
 * 7. Set execute as: "Me"
 * 8. Set access: "Anyone" (or "Anyone with Google account" for more security)
 * 9. Click "Deploy"
 * 10. Copy the web app URL and replace SCHEDULE_WRITE_URL in ScheduleTab.tsx
 * 11. Authorize the script to access your Google Sheets
 * 
 * The web app URL will look like:
 * https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
 */