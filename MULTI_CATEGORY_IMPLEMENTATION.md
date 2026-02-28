# Multi-Category Consent System - Implementation Summary

## Overview
The cybersafety consent system has been enhanced to support three different types of consent forms:
1. **Digital Arrest** (prefix: D-)
2. **Investment Fraud** (prefix: I-)
3. **Other Cybercrimes** (prefix: O-)

## Key Changes Made

### 1. Frontend Changes

#### New Pages Created
- **ConsentCategorySelectionPage.jsx** - Category selection page with three buttons
- **ConsentCategorySelectionPage.css** - Styling for the category page

#### Updated Files

**statements.js**
- Restructured to organize statements by category
- Added Investment Fraud statements (8 statements in English and Telugu)
- Added Other Cybercrimes statements (10 statements in English and Telugu)
- New functions: `getStatements(language, category)`, `getCategoryName(category)`

**helpers.js**
- Updated `generateToken(category)` to generate tokens with category prefixes
- Added `getCategoryPrefix(category)` - returns D-, I-, or O-
- Added `getCategoryFromToken(token)` - extracts category from token

**App.jsx**
- Added route for ConsentCategorySelectionPage at `/cybersuraksha`
- Changed consent form route to `/cybersuraksha/consent-form`

**CybersafetyConsentPage.jsx**
- Retrieves category from sessionStorage
- Passes category to token generation and API calls

**ConsentFlowPage.jsx**
- Uses category to fetch appropriate statements
- Sends category with consent submission

**PoliceAllRecordsPage.jsx**
- Added Category column to records table
- Added category badges with color coding

**PoliceAllRecordsPage.css**
- Added styles for category badges:
  - Digital Arrest: Orange
  - Investment Fraud: Pink
  - Other Cybercrimes: Green

**ConsentRecordDisplay.jsx** (Manager Dashboard)
- Added category display field

### 2. Backend Changes

#### Updated Models
**ConsentRecord.js**
- Added `category` field (required, enum: digital-arrest, investment-fraud, other-cybercrimes)
- Updated token validation to support new format: `/^[DIO]-[A-Z0-9]{7}$/`
- Added category index for efficient filtering
- Updated mobile number index to include category (allows same mobile for different categories)

#### Updated Routes

**consent.js**
- Updated `/check` endpoint to check by mobile number AND category
- Updated `/` (POST) endpoint to:
  - Validate new token format
  - Accept and validate category parameter
  - Check for duplicates per category (same mobile can have different categories)
  - Store category with consent record

**manager.js**
- Updated `/consent/:token` to:
  - Support both old and new token formats (backward compatibility)
  - Return category information
  - Display category name in response

**police.js**
- Updated `/all-records` to include category field
- Updated `/all-records/csv` to export category column
- Both endpoints now return category for all records

### 3. Token System

**New Token Format:**
- Digital Arrest: `D-XXXXXXX` (e.g., D-A1B2C3D)
- Investment Fraud: `I-XXXXXXX` (e.g., I-X9Y8Z7W)
- Other Cybercrimes: `O-XXXXXXX` (e.g., O-M5N6P7Q)

**Backward Compatibility:**
- Old tokens (7 characters without prefix) are still supported
- Manager search endpoint validates both formats

### 4. Database Structure

**ConsentRecord Collection:**
```javascript
{
  name: String,
  mobileNumber: String,
  token: String (unique, format: D-/I-/O- + 7 chars),
  language: String (en/te),
  category: String (digital-arrest/investment-fraud/other-cybercrimes),
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `token`: 1 (unique)
- `mobileNumber`: 1, `category`: 1 (allows same mobile for different categories)
- `category`: 1 (for filtering)

## User Flow

1. User clicks "CyberSuraksha" on main landing page
2. **ConsentCategorySelectionPage** appears with 3 buttons
3. User selects a category (Digital Arrest, Investment Fraud, or Other Cybercrimes)
4. Category is stored in sessionStorage
5. User proceeds to **CybersafetyConsentPage** for language selection and name input
6. System generates token with appropriate prefix
7. User reads category-specific statements
8. Consent is saved with category information
9. Token is displayed with prefix

## Police Dashboard Features

- View all consent records across all categories
- Category column with color-coded badges
- Filter and search across all types
- CSV export includes category information

## Manager Dashboard Features

- Search by token (supports all formats)
- Displays category of the consent
- Works with both old and new token formats

## Testing Checklist

- [ ] Navigate to category selection page
- [ ] Select each category and verify correct statements appear
- [ ] Generate tokens and verify correct prefixes (D-, I-, O-)
- [ ] Submit consent and verify it's saved with category
- [ ] Search in manager dashboard and verify category is displayed
- [ ] View police records and verify category column appears
- [ ] Export CSV and verify category is included
- [ ] Test backward compatibility with old tokens

## Migration Notes

**Existing Records:**
- Old records without category field will default to 'digital-arrest'
- Old tokens (7 chars) will continue to work
- No data migration required due to backward compatibility

## Color Coding

- **Digital Arrest**: Orange (#fff3e0 bg, #e65100 text)
- **Investment Fraud**: Pink (#fce4ec bg, #c2185b text)
- **Other Cybercrimes**: Green (#e8f5e9 bg, #2e7d32 text)
