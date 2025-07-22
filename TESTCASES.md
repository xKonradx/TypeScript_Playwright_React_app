# Test Cases Documentation

**Project:** Tests with Playwright 
**Framework:** Playwright with TypeScript    
**Version:** 1.0  

---

## TC-AUTH-001

| Field               | Description                                                                                                                               
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------
| **Test Case ID**    | TC-AUTH-001                                                                                                                           
| **Title**           | Valid user login with correct credentials                                                                                             
| **Objective**       | Verify that a user can successfully log in with valid username and password                                                          
| **Priority / Risk** | High                                                                                                                                  
| **Preconditions**   | Application is running on localhost:5173, test user exists in system                                                                 
| **Dependencies**    | User data fixture loaded, authentication system operational                                                                           
| **Test Steps**      | 1. Navigate to login page, 2. Enter username "admin", 3. Enter password "adminpassword", 4. Click login button                     
| **Data**            | Username: "admin", Password: "adminpassword"                                                                                         
| **Expected Result** | User successfully logs in and redirects to dashboard page                                                                            
| **Actual Result**   | Pass - User logged in and redirected to /dashboard                                                                                   
| **Status**          | Pass                                                                                                                                  
| **Automated?**      | Yes - tests/login.spec.ts:5                                                                                                          
| **BDD Scenario**    | Given: user is on login page. When: user enters valid credentials. Then: user should be logged in and redirected                   
| **Attachments**     | N/A                                                                                                                                   

---

## TC-AUTH-002

| Field               | Description                                                                                                                               
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------
| **Test Case ID**    | TC-AUTH-002                                                                                                                           
| **Title**           | Invalid login with incorrect password                                                                                                 
| **Objective**       | Verify that system displays error message for invalid credentials                                                                     
| **Priority / Risk** | High                                                                                                                                  
| **Preconditions**   | Application is running, login page accessible                                                                                         
| **Dependencies**    | Authentication system operational                                                                                                     
| **Test Steps**      | 1. Navigate to login page, 2. Enter username "admin", 3. Enter incorrect password "wrongpass", 4. Click login button           
| **Data**            | Username: "admin", Password: "wrongpass"                                                                                         
| **Expected Result** | Error message displayed, user not authenticated                                                                                       
| **Actual Result**   | Pass - Error message shown, no authentication                                                                                        
| **Status**          | Pass                                                                                                                                  
| **Automated?**      | Yes - tests/login.spec.ts:14                                                                                                         
| **BDD Scenario**    | Given: user is on login page. When: user enters invalid credentials. Then: error message should be displayed                       
| **Attachments**     | N/A                                                                                                                                   

---

## TC-AUTH-003

| Field               | Description                                                                                                                               
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------
| **Test Case ID**    | TC-AUTH-003                                                                                                                           
| **Title**           | Login form validation for empty fields                                                                                               
| **Objective**       | Verify form validation displays errors for empty required fields                                                                     
| **Priority / Risk** | Medium                                                                                                                                
| **Preconditions**   | Application is running, login page accessible                                                                                         
| **Dependencies**    | Form validation system active                                                                                                         
| **Test Steps**      | 1. Navigate to login page, 2. Leave username field empty, 3. Leave password field empty, 4. Click login button                     
| **Data**            | Username: "", Password: ""                                                                                                       
| **Expected Result** | Validation errors displayed for required fields                                                                                       
| **Actual Result**   | Pass - Validation errors shown for empty fields                                                                                      
| **Status**          | Pass                                                                                                                                  
| **Automated?**      | Yes - tests/login.spec.ts:23                                                                                                         
| **BDD Scenario**    | Given: user is on login page. When: user submits empty form. Then: validation errors should be displayed                           
| **Attachments**     | N/A                                                                                                                                   

---

## TC-AUTH-004

| Field               | Description                                                                                                                               
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------
| **Test Case ID**    | TC-AUTH-004                                                                                                                           
| **Title**           | Forgot password link navigation                                                                                                       
| **Objective**       | Verify forgot password link redirects to password reset page                                                                         
| **Priority / Risk** | Medium                                                                                                                                
| **Preconditions**   | Application is running, login page accessible                                                                                         
| **Dependencies**    | Navigation routing system operational                                                                                                 
| **Test Steps**      | 1. Navigate to login page, 2. Click "Forgot password?" link                                                                         
| **Data**            | N/A                                                                                                                                   
| **Expected Result** | User redirected to password reset page (/reset)                                                                                       
| **Actual Result**   | Pass - Successfully redirected to /reset                                                                                             
| **Status**          | Pass                                                                                                                                  
| **Automated?**      | Yes - tests/login.spec.ts:33                                                                                                         
| **BDD Scenario**    | Given: user is on login page. When: user clicks forgot password link. Then: user should be redirected to reset page               
| **Attachments**     | N/A                                                                                                                                   

---

## TC-AUTH-005

| Field               | Description                                                                                                                               
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------
| **Test Case ID**    | TC-AUTH-005                                                                                                                           
| **Title**           | Post-login redirect to dashboard                                                                                                      
| **Objective**       | Verify successful login redirects user to dashboard page                                                                             
| **Priority / Risk** | High                                                                                                                                  
| **Preconditions**   | Application running, valid user credentials available                                                                                 
| **Dependencies**    | Authentication and routing systems operational                                                                                        
| **Test Steps**      | 1. Navigate to login page, 2. Enter valid credentials, 3. Click login button, 4. Verify redirection                                 
| **Data**            | Username: "admin", Password: "adminpassword"                                                                                     
| **Expected Result** | User lands on dashboard page after successful login                                                                                   
| **Actual Result**   | Pass - User redirected to /dashboard                                                                                                 
| **Status**          | Pass                                                                                                                                  
| **Automated?**      | Yes - tests/login.spec.ts:40                                                                                                         
| **BDD Scenario**    | Given: user has valid credentials. When: user logs in successfully. Then: user should be redirected to dashboard                   
| **Attachments**     | N/A                                                                                                                                   

---

## TC-REG-001

| Field               | Description                                                                                                                               
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------
| **Test Case ID**    | TC-REG-001                                                                                                                           
| **Title**           | Successful user registration with valid data                                                                                         
| **Objective**       | Verify new user can register with valid information                                                                                 
| **Priority / Risk** | High                                                                                                                                  
| **Preconditions**   | Application running, registration page accessible                                                                                     
| **Dependencies**    | User creation system operational                                                                                                     
| **Test Steps**      | 1. Navigate to registration page, 2. Enter unique username, 3. Enter strong password, 4. Confirm password, 5. Click register       
| **Data**            | Username: "newuser123", Password: "StrongPass123!"                                                                               
| **Expected Result** | New user account created successfully                                                                                                 
| **Actual Result**   | Pass - User registration completed                                                                                                   
| **Status**          | Pass                                                                                                                                  
| **Automated?**      | Yes - tests/register.spec.ts:5                                                                                                       
| **BDD Scenario**    | Given: user is on registration page. When: user enters valid registration data. Then: account should be created                     
| **Attachments**     | N/A                                                                                                                                   

---

## TC-REG-002

| Field               | Description                                                                                                                               
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------
| **Test Case ID**    | TC-REG-002                                                                                                                           
| **Title**           | Registration with existing username                                                                                                   
| **Objective**       | Verify system prevents duplicate username registration                                                                               
| **Priority / Risk** | High                                                                                                                                  
| **Preconditions**   | Application running, existing user in system                                                                                         
| **Dependencies**    | User validation system active                                                                                                         
| **Test Steps**      | 1. Navigate to registration page, 2. Enter existing username, 3. Enter valid password, 4. Click register                           
| **Data**            | Username: "existinguser", Password: "ValidPass123!"                                                                               
| **Expected Result** | Error message displayed, registration blocked                                                                                         
| **Actual Result**   | Pass - Duplicate username error shown                                                                                               
| **Status**          | Pass                                                                                                                                  
| **Automated?**      | Yes - tests/register.spec.ts:12                                                                                                     
| **BDD Scenario**    | Given: user is on registration page. When: user enters existing username. Then: duplicate error should be displayed                 
| **Attachments**     | N/A                                                                                                                                   

---

## TC-REG-003

| Field               | Description                                                                                                                               
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------
| **Test Case ID**    | TC-REG-003                                                                                                                           
| **Title**           | Registration with weak password                                                                                                       
| **Objective**       | Verify password strength validation prevents weak passwords                                                                         
| **Priority / Risk** | Medium                                                                                                                                
| **Preconditions**   | Application running, password policy active                                                                                           
| **Dependencies**    | Password validation system operational                                                                                               
| **Test Steps**      | 1. Navigate to registration page, 2. Enter valid username, 3. Enter weak password, 4. Click register                               
| **Data**            | Username: "testuser", Password: "123"                                                                                             
| **Expected Result** | Password strength error displayed                                                                                                     
| **Actual Result**   | Pass - Weak password error shown                                                                                                     
| **Status**          | Pass                                                                                                                                  
| **Automated?**      | Yes - tests/register.spec.ts:19                                                                                                     
| **BDD Scenario**    | Given: user is on registration page. When: user enters weak password. Then: password strength error should show                     
| **Attachments**     | N/A                                                                                                                                   

---

## TC-REG-004

| Field               | Description                                                                                                                               
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------
| **Test Case ID**    | TC-REG-004                                                                                                                           
| **Title**           | Password confirmation mismatch                                                                                                       
| **Objective**       | Verify system detects password confirmation mismatch                                                                               
| **Priority / Risk** | Medium                                                                                                                                
| **Preconditions**   | Application running, registration form accessible                                                                                     
| **Dependencies**    | Form validation system active                                                                                                         
| **Test Steps**      | 1. Navigate to registration page, 2. Enter valid username, 3. Enter password, 4. Enter different confirmation password, 5. Click register 
| **Data**            | Username: "testuser", Password: "Pass123!", Confirm: "DifferentPass!"                                                           
| **Expected Result** | Password mismatch error displayed                                                                                                     
| **Actual Result**   | Pass - Mismatch error shown                                                                                                           
| **Status**          | Pass                                                                                                                                  
| **Automated?**      | Yes - tests/register.spec.ts:26                                                                                                     
| **BDD Scenario**    | Given: user is on registration page. When: passwords don't match. Then: mismatch error should be displayed                         
| **Attachments**     | N/A                                                                                                                                   

---

## TC-REG-005

| Field               | Description                                                                                                                               
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------
| **Test Case ID**    | TC-REG-005                                                                                                                           
| **Title**           | Required field validation on registration                                                                                             
| **Objective**       | Verify all required fields are validated on form submission                                                                         
| **Priority / Risk** | Medium                                                                                                                                
| **Preconditions**   | Application running, registration page accessible                                                                                     
| **Dependencies**    | Form validation system operational                                                                                                   
| **Test Steps**      | 1. Navigate to registration page, 2. Leave required fields empty, 3. Click register button                                         
| **Data**            | All fields empty                                                                                                                     
| **Expected Result** | Field-specific validation errors displayed                                                                                           
| **Actual Result**   | Pass - Validation errors shown for required fields                                                                                   
| **Status**          | Pass                                                                                                                                  
| **Automated?**      | Yes - tests/register.spec.ts:33                                                                                                     
| **BDD Scenario**    | Given: user is on registration page. When: user submits empty form. Then: required field errors should show                         
| **Attachments**     | N/A                                                                                                                                   

---

## TC-RESET-001

| Field               | Description                                                                                                                               
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------
| **Test Case ID**    | TC-RESET-001                                                                                                                         
| **Title**           | Password reset request with valid email                                                                                               
| **Objective**       | Verify password reset process for existing user                                                                                     
| **Priority / Risk** | High                                                                                                                                  
| **Preconditions**   | Application running, existing user in system                                                                                         
| **Dependencies**    | Password reset system operational                                                                                                     
| **Test Steps**      | 1. Navigate to password reset page, 2. Enter existing username, 3. Click reset button                                               
| **Data**            | Username: "admin"                                                                                                                   
| **Expected Result** | Password reset process initiated successfully                                                                                         
| **Actual Result**   | Pass - Reset process started                                                                                                         
| **Status**          | Pass                                                                                                                                  
| **Automated?**      | Yes - tests/reset.spec.ts:5                                                                                                         
| **BDD Scenario**    | Given: user is on reset page. When: user enters valid username. Then: reset process should be initiated                           
| **Attachments**     | N/A                                                                                                                                   

---

## TC-RESET-002

| Field               | Description                                                                                                                               
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------
| **Test Case ID**    | TC-RESET-002                                                                                                                         
| **Title**           | Password reset with invalid username                                                                                                 
| **Objective**       | Verify error handling for non-existent users                                                                                       
| **Priority / Risk** | Medium                                                                                                                                
| **Preconditions**   | Application running, password reset page accessible                                                                                   
| **Dependencies**    | User validation system active                                                                                                         
| **Test Steps**      | 1. Navigate to password reset page, 2. Enter non-existent username, 3. Click reset button                                         
| **Data**            | Username: "nonexistentuser"                                                                                                         
| **Expected Result** | Error message displayed for invalid user                                                                                             
| **Actual Result**   | Pass - Invalid user error shown                                                                                                     
| **Status**          | Pass                                                                                                                                  
| **Automated?**      | Yes - tests/reset.spec.ts:19                                                                                                       
| **BDD Scenario**    | Given: user is on reset page. When: user enters invalid username. Then: error message should be displayed                         
| **Attachments**     | N/A                                                                                                                                   

---

## TC-RESET-003

| Field               | Description                                                                                                                               
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------
| **Test Case ID**    | TC-RESET-003                                                                                                                         
| **Title**           | Password reset form validation                                                                                                       
| **Objective**       | Verify required field validation on reset form                                                                                     
| **Priority / Risk** | Low                                                                                                                                   
| **Preconditions**   | Application running, reset page accessible                                                                                           
| **Dependencies**    | Form validation system active                                                                                                         
| **Test Steps**      | 1. Navigate to password reset page, 2. Leave username field empty, 3. Click reset button                                           
| **Data**            | Username: ""                                                                                                                       
| **Expected Result** | Validation error for required username field                                                                                         
| **Actual Result**   | Pass - Required field validation shown                                                                                               
| **Status**          | Pass                                                                                                                                  
| **Automated?**      | Yes - tests/reset.spec.ts:26                                                                                                       
| **BDD Scenario**    | Given: user is on reset page. When: user submits empty form. Then: validation error should show                                     
| **Attachments**     | N/A                                                                                                                                   

---

## TC-DASH-001

| Field               | Description                                                                                                                               
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------
| **Test Case ID**    | TC-DASH-001                                                                                                                           
| **Title**           | Dashboard access for authenticated user                                                                                               
| **Objective**       | Verify logged-in users can access dashboard                                                                                         
| **Priority / Risk** | High                                                                                                                                  
| **Preconditions**   | Application running, user logged in                                                                                                   
| **Dependencies**    | Authentication system operational                                                                                                     
| **Test Steps**      | 1. Log in with valid credentials, 2. Navigate to dashboard, 3. Verify page loads                                                   
| **Data**            | Authenticated user session                                                                                                           
| **Expected Result** | Dashboard page loads successfully                                                                                                     
| **Actual Result**   | Pass - Dashboard accessible to authenticated user                                                                                   
| **Status**          | Pass                                                                                                                                  
| **Automated?**      | Yes - tests/dashboard.spec.ts:5                                                                                                     
| **BDD Scenario**    | Given: user is logged in. When: user navigates to dashboard. Then: dashboard should load                                           
| **Attachments**     | N/A                                                                                                                                   

---

## TC-DASH-002

| Field               | Description                                                                                                                               
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------
| **Test Case ID**    | TC-DASH-002                                                                                                                           
| **Title**           | Dashboard redirect for unauthenticated user                                                                                         
| **Objective**       | Verify unauthenticated users are redirected to login                                                                               
| **Priority / Risk** | High                                                                                                                                  
| **Preconditions**   | Application running, no active user session                                                                                         
| **Dependencies**    | Authentication guard system active                                                                                                   
| **Test Steps**      | 1. Ensure no active session, 2. Navigate directly to dashboard URL, 3. Verify redirection                                         
| **Data**            | No authentication data                                                                                                               
| **Expected Result** | User redirected to login page                                                                                                         
| **Actual Result**   | Pass - Redirect to login page occurred                                                                                               
| **Status**          | Pass                                                                                                                                  
| **Automated?**      | Yes - tests/dashboard.spec.ts:11                                                                                                   
| **BDD Scenario**    | Given: user is not logged in. When: user accesses dashboard. Then: should redirect to login                                         
| **Attachments**     | N/A                                                                                                                                   

---

## TC-DASH-003

| Field               | Description                                                                                                                               
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------
| **Test Case ID**    | TC-DASH-003                                                                                                                           
| **Title**           | Dashboard interactive elements functionality                                                                                         
| **Objective**       | Verify dashboard buttons and links are functional                                                                                   
| **Priority / Risk** | Medium                                                                                                                                
| **Preconditions**   | User logged in, dashboard accessible                                                                                                 
| **Dependencies**    | Dashboard UI components loaded                                                                                                       
| **Test Steps**      | 1. Navigate to dashboard, 2. Interact with dashboard buttons, 3. Test crash button functionality                                   
| **Data**            | Authenticated user session                                                                                                           
| **Expected Result** | All dashboard elements respond correctly                                                                                             
| **Actual Result**   | Pass - Interactive elements working                                                                                                 
| **Status**          | Pass                                                                                                                                  
| **Automated?**      | Yes - tests/dashboard.spec.ts:17                                                                                                   
| **BDD Scenario**    | Given: user is on dashboard. When: user clicks interactive elements. Then: elements should respond                                 
| **Attachments**     | N/A                                                                                                                                   

---

## TC-PROF-001

| Field               | Description                                                                                                                               
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------
| **Test Case ID**    | TC-PROF-001                                                                                                                           
| **Title**           | Profile page access for authenticated user                                                                                           
| **Objective**       | Verify logged-in users can access their profile                                                                                     
| **Priority / Risk** | High                                                                                                                                  
| **Preconditions**   | User logged in, profile system operational                                                                                           
| **Dependencies**    | Authentication system active                                                                                                         
| **Test Steps**      | 1. Log in with valid credentials, 2. Navigate to profile page, 3. Verify page loads with user data                                 
| **Data**            | Authenticated user session                                                                                                           
| **Expected Result** | Profile page loads with user information                                                                                             
| **Actual Result**   | Pass - Profile accessible with user data                                                                                           
| **Status**          | Pass                                                                                                                                  
| **Automated?**      | Yes - tests/profile.spec.ts:5                                                                                                       
| **BDD Scenario**    | Given: user is logged in. When: user navigates to profile. Then: profile should load                                               
| **Attachments**     | N/A                                                                                                                                   

---

## TC-PROF-002

| Field               | Description                                                                                                                               
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------
| **Test Case ID**    | TC-PROF-002                                                                                                                           
| **Title**           | Profile page redirect for unauthenticated user                                                                                       
| **Objective**       | Verify unauthenticated users cannot access profile                                                                                 
| **Priority / Risk** | High                                                                                                                                  
| **Preconditions**   | No active user session                                                                                                               
| **Dependencies**    | Authentication guard system active                                                                                                   
| **Test Steps**      | 1. Ensure no active session, 2. Navigate to profile URL, 3. Verify redirection to login                                           
| **Data**            | No authentication data                                                                                                               
| **Expected Result** | User redirected to login page                                                                                                         
| **Actual Result**   | Pass - Redirect to login occurred                                                                                                   
| **Status**          | Pass                                                                                                                                  
| **Automated?**      | Yes - tests/profile.spec.ts:17                                                                                                     
| **BDD Scenario**    | Given: user is not logged in. When: user accesses profile. Then: should redirect to login                                         
| **Attachments**     | N/A                                                                                                                                   

---

## TC-PROF-003

| Field               | Description                                                                                                                               
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------
| **Test Case ID**    | TC-PROF-003                                                                                                                           
| **Title**           | Profile information update                                                                                                           
| **Objective**       | Verify user can update their profile information                                                                                   
| **Priority / Risk** | Medium                                                                                                                                
| **Preconditions**   | User logged in, profile page accessible                                                                                             
| **Dependencies**    | Profile update system operational                                                                                                   
| **Test Steps**      | 1. Navigate to profile page, 2. Modify display name, 3. Save changes, 4. Verify update                                           
| **Data**            | New display name: "Updated Name"                                                                                                   
| **Expected Result** | Profile information updated successfully                                                                                             
| **Actual Result**   | Pass - Profile update completed                                                                                                     
| **Status**          | Pass                                                                                                                                  
| **Automated?**      | Yes - tests/profile.spec.ts:23                                                                                                     
| **BDD Scenario**    | Given: user is on profile page. When: user updates information. Then: changes should be saved                                     
| **Attachments**     | N/A                                                                                                                                   

---

## TC-PROF-004

| Field               | Description                                                                                                                               
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------
| **Test Case ID**    | TC-PROF-004                                                                                                                           
| **Title**           | Profile password change validation                                                                                                   
| **Objective**       | Verify password change requires valid old password                                                                                 
| **Priority / Risk** | High                                                                                                                                  
| **Preconditions**   | User logged in, profile page accessible                                                                                             
| **Dependencies**    | Password change system operational                                                                                                   
| **Test Steps**      | 1. Navigate to profile page, 2. Enter incorrect old password, 3. Enter new password, 4. Attempt to save                           
| **Data**            | Old: "wrongpass", New: "NewPass123!"                                                                                             
| **Expected Result** | Error displayed for invalid old password                                                                                             
| **Actual Result**   | Pass - Invalid password error shown                                                                                                 
| **Status**          | Pass                                                                                                                                  
| **Automated?**      | Yes - tests/profile.spec.ts:38                                                                                                     
| **BDD Scenario**    | Given: user is changing password. When: old password is wrong. Then: error should be displayed                                     
| **Attachments**     | N/A                                                                                                                                   

---

## TC-PROF-005

| Field               | Description                                                                                                                               
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------
| **Test Case ID**    | TC-PROF-005                                                                                                                           
| **Title**           | Avatar upload functionality                                                                                                           
| **Objective**       | Verify user can upload and update avatar image                                                                                     
| **Priority / Risk** | Low                                                                                                                                   
| **Preconditions**   | User logged in, profile page accessible                                                                                             
| **Dependencies**    | File upload system operational                                                                                                       
| **Test Steps**      | 1. Navigate to profile page, 2. Click avatar upload, 3. Select image file, 4. Verify upload                                       
| **Data**            | Image file for avatar                                                                                                               
| **Expected Result** | Avatar upload completes successfully                                                                                                 
| **Actual Result**   | Pass - Avatar upload functional                                                                                                     
| **Status**          | Pass                                                                                                                                  
| **Automated?**      | Yes - tests/profile.spec.ts:55                                                                                                     
| **BDD Scenario**    | Given: user is on profile page. When: user uploads avatar. Then: image should be updated                                           
| **Attachments**     | N/A                                                                                                                                   

---

## TC-ADMIN-001

| Field               | Description                                                                                                                               
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------
| **Test Case ID**    | TC-ADMIN-001                                                                                                                         
| **Title**           | Admin panel access for admin user                                                                                                   
| **Objective**       | Verify admin users can access admin panel                                                                                           
| **Priority / Risk** | High                                                                                                                                  
| **Preconditions**   | Admin user logged in                                                                                                                 
| **Dependencies**    | Role-based access control active                                                                                                     
| **Test Steps**      | 1. Log in as admin user, 2. Navigate to admin panel, 3. Verify admin controls visible                                             
| **Data**            | Admin credentials                                                                                                                   
| **Expected Result** | Admin panel loads with users management link                                                                                         
| **Actual Result**   | Pass - Admin panel accessible with admin controls                                                                                   
| **Status**          | Pass                                                                                                                                  
| **Automated?**      | Yes - tests/admin.spec.ts:5                                                                                                         
| **BDD Scenario**    | Given: admin user is logged in. When: user accesses admin panel. Then: admin controls should show                                 
| **Attachments**     | N/A                                                                                                                                   

---

## TC-ADMIN-002

| Field               | Description                                                                                                                               
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------
| **Test Case ID**    | TC-ADMIN-002                                                                                                                         
| **Title**           | Admin panel access denied for regular user                                                                                           
| **Objective**       | Verify non-admin users cannot access admin panel                                                                                   
| **Priority / Risk** | High                                                                                                                                  
| **Preconditions**   | Regular user logged in                                                                                                               
| **Dependencies**    | Role-based access control active                                                                                                     
| **Test Steps**      | 1. Log in as regular user, 2. Navigate to admin panel URL, 3. Verify access denied                                                 
| **Data**            | Regular user credentials                                                                                                             
| **Expected Result** | Access denied message displayed                                                                                                       
| **Actual Result**   | Pass - Access denied for regular user                                                                                               
| **Status**          | Pass                                                                                                                                  
| **Automated?**      | Yes - tests/admin.spec.ts:11                                                                                                       
| **BDD Scenario**    | Given: regular user is logged in. When: user accesses admin panel. Then: access should be denied                                   
| **Attachments**     | N/A                                                                                                                                   

---

## TC-USER-001

| Field               | Description                                                                                                                               
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------
| **Test Case ID**    | TC-USER-001                                                                                                                           
| **Title**           | User management table loading                                                                                                         
| **Objective**       | Verify admin can access user management interface                                                                                   
| **Priority / Risk** | High                                                                                                                                  
| **Preconditions**   | Admin user logged in                                                                                                                 
| **Dependencies**    | User management system operational                                                                                                   
| **Test Steps**      | 1. Log in as admin, 2. Navigate to users management, 3. Verify table loads                                                         
| **Data**            | Admin session                                                                                                                       
| **Expected Result** | User management table displays                                                                                                       
| **Actual Result**   | Pass - User table loaded successfully                                                                                               
| **Status**          | Pass                                                                                                                                  
| **Automated?**      | Yes - tests/adminUsers.spec.ts:13                                                                                                   
| **BDD Scenario**    | Given: admin is logged in. When: admin accesses user management. Then: user table should load                                     
| **Attachments**     | N/A                                                                                                                                   

---

## TC-USER-002

| Field               | Description                                                                                                                               
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------
| **Test Case ID**    | TC-USER-002                                                                                                                           
| **Title**           | User listing display                                                                                                                 
| **Objective**       | Verify all registered users are displayed in table                                                                                 
| **Priority / Risk** | High                                                                                                                                  
| **Preconditions**   | Admin logged in, users exist in system                                                                                               
| **Dependencies**    | User data retrieval system active                                                                                                   
| **Test Steps**      | 1. Access user management, 2. Verify user list displays, 3. Check user count                                                       
| **Data**            | Existing user records                                                                                                               
| **Expected Result** | All users displayed in organized table format                                                                                       
| **Actual Result**   | Pass - All users listed correctly                                                                                                   
| **Status**          | Pass                                                                                                                                  
| **Automated?**      | Yes - tests/adminUsers.spec.ts:20                                                                                                   
| **BDD Scenario**    | Given: admin is viewing user management. When: page loads. Then: all users should be listed                                         
| **Attachments**     | N/A                                                                                                                                   

---

## TC-USER-003

| Field               | Description                                                                                                                               
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------
| **Test Case ID**    | TC-USER-003                                                                                                                           
| **Title**           | User search and filter functionality                                                                                                 
| **Objective**       | Verify admin can search and filter users                                                                                           
| **Priority / Risk** | Medium                                                                                                                                
| **Preconditions**   | Admin logged in, multiple users exist                                                                                               
| **Dependencies**    | Search functionality operational                                                                                                     
| **Test Steps**      | 1. Access user management, 2. Enter search criteria, 3. Verify filtered results                                                     
| **Data**            | Search terms for filtering                                                                                                           
| **Expected Result** | Users filtered according to search criteria                                                                                         
| **Actual Result**   | Pass - Search functionality working                                                                                                 
| **Status**          | Pass                                                                                                                                  
| **Automated?**      | Yes - tests/adminUsers.spec.ts:27                                                                                                   
| **BDD Scenario**    | Given: admin is viewing users. When: admin searches for users. Then: results should be filtered                                     
| **Attachments**     | N/A                                                                                                                                   

---

## TC-USER-004

| Field               | Description                                                                                                                               
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------
| **Test Case ID**    | TC-USER-004                                                                                                                           
| **Title**           | Individual user deletion                                                                                                             
| **Objective**       | Verify admin can delete individual users with confirmation                                                                         
| **Priority / Risk** | High                                                                                                                                  
| **Preconditions**   | Admin logged in, deleteable user exists                                                                                             
| **Dependencies**    | User deletion system active                                                                                                         
| **Test Steps**      | 1. Select user to delete, 2. Click delete button, 3. Confirm deletion, 4. Verify user removed                                     
| **Data**            | Target user for deletion                                                                                                             
| **Expected Result** | User deleted after confirmation                                                                                                       
| **Actual Result**   | Pass - User deletion completed                                                                                                       
| **Status**          | Pass                                                                                                                                  
| **Automated?**      | Yes - tests/adminUsers.spec.ts:33                                                                                                   
| **BDD Scenario**    | Given: admin selects user. When: admin deletes user. Then: user should be removed                                                   
| **Attachments**     | N/A                                                                                                                                   

---

## TC-USER-005

| Field               | Description                                                                                                                               
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------
| **Test Case ID**    | TC-USER-005                                                                                                                           
| **Title**           | User deletion cancellation                                                                                                           
| **Objective**       | Verify admin can cancel user deletion                                                                                               
| **Priority / Risk** | Medium                                                                                                                                
| **Preconditions**   | Admin logged in, user selected for deletion                                                                                         
| **Dependencies**    | Confirmation dialog system active                                                                                                   
| **Test Steps**      | 1. Select user to delete, 2. Click delete button, 3. Cancel deletion, 4. Verify user preserved                                     
| **Data**            | User selected for deletion                                                                                                           
| **Expected Result** | Deletion cancelled, user remains                                                                                                     
| **Actual Result**   | Pass - Deletion cancelled successfully                                                                                               
| **Status**          | Pass                                                                                                                                  
| **Automated?**      | Yes - tests/adminUsers.spec.ts:43                                                                                                   
| **BDD Scenario**    | Given: admin starts deletion. When: admin cancels deletion. Then: user should remain                                               
| **Attachments**     | N/A                                                                                                                                   

---

## TC-USER-006

| Field               | Description                                                                                                                               
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------
| **Test Case ID**    | TC-USER-006                                                                                                                           
| **Title**           | User role change functionality                                                                                                       
| **Objective**       | Verify admin can change user roles                                                                                                 
| **Priority / Risk** | High                                                                                                                                  
| **Preconditions**   | Admin logged in, user with changeable role                                                                                         
| **Dependencies**    | Role management system operational                                                                                                   
| **Test Steps**      | 1. Select user, 2. Change role, 3. Confirm change, 4. Verify role updated                                                         
| **Data**            | Target user and new role                                                                                                             
| **Expected Result** | User role updated successfully                                                                                                       
| **Actual Result**   | Pass - Role change completed                                                                                                         
| **Status**          | Pass                                                                                                                                  
| **Automated?**      | Yes - tests/adminUsers.spec.ts:53                                                                                                   
| **BDD Scenario**    | Given: admin selects user. When: admin changes role. Then: role should be updated                                                   
| **Attachments**     | N/A                                                                                                                                   

---

## TC-USER-007

| Field               | Description                                                                                                                               
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------
| **Test Case ID**    | TC-USER-007                                                                                                                           
| **Title**           | User role change cancellation                                                                                                       
| **Objective**       | Verify admin can cancel role changes                                                                                               
| **Priority / Risk** | Medium                                                                                                                                
| **Preconditions**   | Admin logged in, role change initiated                                                                                               
| **Dependencies**    | Role change confirmation system active                                                                                               
| **Test Steps**      | 1. Select user, 2. Initiate role change, 3. Cancel change, 4. Verify original role maintained                                     
| **Data**            | User and original role                                                                                                               
| **Expected Result** | Role change cancelled, original role preserved                                                                                       
| **Actual Result**   | Pass - Role change cancellation working                                                                                             
| **Status**          | Pass                                                                                                                                  
| **Automated?**      | Yes - tests/adminUsers.spec.ts:63                                                                                                   
| **BDD Scenario**    | Given: admin starts role change. When: admin cancels change. Then: original role should remain                                     
| **Attachments**     | N/A                                                                                                                                   

---

## TC-USER-008

| Field               | Description                                                                                                                               
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------
| **Test Case ID**    | TC-USER-008                                                                                                                           
| **Title**           | Bulk user selection                                                                                                                   
| **Objective**       | Verify admin can select all users for bulk operations                                                                               
| **Priority / Risk** | Medium                                                                                                                                
| **Preconditions**   | Admin logged in, multiple users exist                                                                                               
| **Dependencies**    | Bulk selection system operational                                                                                                     
| **Test Steps**      | 1. Access user management, 2. Click select all, 3. Verify all users selected                                                       
| **Data**            | Multiple user records                                                                                                               
| **Expected Result** | All users selected for bulk operations                                                                                               
| **Actual Result**   | Pass - Select all functionality working                                                                                             
| **Status**          | Pass                                                                                                                                  
| **Automated?**      | Yes - tests/adminUsers.spec.ts:73                                                                                                   
| **BDD Scenario**    | Given: admin views user list. When: admin selects all users. Then: all users should be selected                                     
| **Attachments**     | N/A                                                                                                                                   

---

## TC-USER-009

| Field               | Description                                                                                                                               
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------
| **Test Case ID**    | TC-USER-009                                                                                                                           
| **Title**           | Bulk user deletion                                                                                                                   
| **Objective**       | Verify admin can delete multiple users simultaneously                                                                               
| **Priority / Risk** | High                                                                                                                                  
| **Preconditions**   | Admin logged in, multiple users selected                                                                                             
| **Dependencies**    | Bulk deletion system operational                                                                                                     
| **Test Steps**      | 1. Select multiple users, 2. Click bulk delete, 3. Verify users deleted                                                           
| **Data**            | Multiple selected users                                                                                                             
| **Expected Result** | All selected users deleted                                                                                                           
| **Actual Result**   | Pass - Bulk deletion completed                                                                                                       
| **Status**          | Pass                                                                                                                                  
| **Automated?**      | Yes - tests/adminUsers.spec.ts:73                                                                                                   
| **BDD Scenario**    | Given: admin selects multiple users. When: admin performs bulk delete. Then: users should be removed                               
| **Attachments**     | N/A                                                                                                                                   

---

## TC-USER-010

| Field               | Description                                                                                                                               
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------
| **Test Case ID**    | TC-USER-010                                                                                                                           
| **Title**           | Bulk role change                                                                                                                     
| **Objective**       | Verify admin can change roles for multiple users                                                                                   
| **Priority / Risk** | Medium                                                                                                                                
| **Preconditions**   | Admin logged in, multiple users selected                                                                                             
| **Dependencies**    | Bulk role change system operational                                                                                                 
| **Test Steps**      | 1. Select multiple users, 2. Choose new role, 3. Apply bulk change, 4. Verify roles updated                                       
| **Data**            | Selected users and target role                                                                                                       
| **Expected Result** | All selected users' roles updated                                                                                                   
| **Actual Result**   | Pass - Bulk role change completed                                                                                                   
| **Status**          | Pass                                                                                                                                  
| **Automated?**      | Yes - tests/adminUsers.spec.ts:81                                                                                                   
| **BDD Scenario**    | Given: admin selects multiple users. When: admin changes roles in bulk. Then: all roles should update                             
| **Attachments**     | N/A                                                                                                                                   

---

## TC-USER-011

| Field               | Description                                                                                                                               
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------
| **Test Case ID**    | TC-USER-011                                                                                                                           
| **Title**           | User deletion error handling                                                                                                         
| **Objective**       | Verify system handles user deletion failures gracefully                                                                             
| **Priority / Risk** | Medium                                                                                                                                
| **Preconditions**   | Admin logged in, deletion failure scenario                                                                                           
| **Dependencies**    | Error handling system operational                                                                                                     
| **Test Steps**      | 1. Attempt to delete user, 2. Trigger deletion failure, 3. Verify error handling                                                   
| **Data**            | User that cannot be deleted                                                                                                         
| **Expected Result** | Error message displayed, graceful failure handling                                                                                   
| **Actual Result**   | Pass - Error handled gracefully                                                                                                     
| **Status**          | Pass                                                                                                                                  
| **Automated?**      | Yes - tests/adminUsers.spec.ts:90                                                                                                   
| **BDD Scenario**    | Given: deletion will fail. When: admin attempts delete. Then: error should be handled                                               
| **Attachments**     | N/A                                                                                                                                   

---

## TC-USER-012

| Field               | Description                                                                                                                               
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------
| **Test Case ID**    | TC-USER-012                                                                                                                           
| **Title**           | Role change error handling                                                                                                           
| **Objective**       | Verify system handles role change failures appropriately                                                                           
| **Priority / Risk** | Medium                                                                                                                                
| **Preconditions**   | Admin logged in, role change failure scenario                                                                                       
| **Dependencies**    | Error handling system operational                                                                                                     
| **Test Steps**      | 1. Attempt role change, 2. Trigger role change failure, 3. Verify error handling                                                   
| **Data**            | Role change that will fail                                                                                                           
| **Expected Result** | Error message displayed, original role preserved                                                                                     
| **Actual Result**   | Pass - Role change error handled                                                                                                     
| **Status**          | Pass                                                                                                                                  
| **Automated?**      | Yes - tests/adminUsers.spec.ts:101                                                                                                   
| **BDD Scenario**    | Given: role change will fail. When: admin attempts change. Then: error should be displayed                                         
| **Attachments**     | N/A                                                                                                                                   

---

## TC-NAV-001

| Field               | Description                                                                                                                               
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------
| **Test Case ID**    | TC-NAV-001                                                                                                                           
| **Title**           | Protected route enforcement                                                                                                           
| **Objective**       | Verify unauthenticated users cannot access protected routes                                                                         
| **Priority / Risk** | High                                                                                                                                  
| **Preconditions**   | No active user session                                                                                                               
| **Dependencies**    | Route guard system operational                                                                                                       
| **Test Steps**      | 1. Ensure no active session, 2. Navigate to protected route (/dashboard), 3. Verify redirect                                       
| **Data**            | Protected route URL                                                                                                                 
| **Expected Result** | User redirected to login page                                                                                                         
| **Actual Result**   | Pass - Redirect to login occurred                                                                                                   
| **Status**          | Pass                                                                                                                                  
| **Automated?**      | Yes - tests/navigation.spec.ts:4                                                                                                   
| **BDD Scenario**    | Given: user is not authenticated. When: user accesses protected route. Then: should redirect to login                               
| **Attachments**     | N/A                                                                                                                                   

---

## TC-NAV-002

| Field               | Description                                                                                                                               
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------
| **Test Case ID**    | TC-NAV-002                                                                                                                           
| **Title**           | Admin route protection                                                                                                               
| **Objective**       | Verify non-admin users cannot access admin routes                                                                                   
| **Priority / Risk** | High                                                                                                                                  
| **Preconditions**   | Regular user logged in                                                                                                               
| **Dependencies**    | Role-based route protection active                                                                                                   
| **Test Steps**      | 1. Log in as regular user, 2. Navigate to admin route, 3. Verify access denied                                                     
| **Data**            | Regular user session                                                                                                                 
| **Expected Result** | Access denied message, URL remains /admin                                                                                           
| **Actual Result**   | Pass - Access denied for non-admin                                                                                                 
| **Status**          | Pass                                                                                                                                  
| **Automated?**      | Yes - tests/navigation.spec.ts:9                                                                                                   
| **BDD Scenario**    | Given: regular user is logged in. When: user accesses admin route. Then: access should be denied                                   
| **Attachments**     | N/A                                                                                                                                   

---

## TC-NAV-003

| Field               | Description                                                                                                                               
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------
| **Test Case ID**    | TC-NAV-003                                                                                                                           
| **Title**           | 404 error page handling                                                                                                               
| **Objective**       | Verify system displays appropriate error page for unknown routes                                                                     
| **Priority / Risk** | Low                                                                                                                                   
| **Preconditions**   | Application running                                                                                                                   
| **Dependencies**    | Error page system operational                                                                                                         
| **Test Steps**      | 1. Navigate to non-existent route, 2. Verify 404 page displays                                                                     
| **Data**            | Invalid route URL                                                                                                                     
| **Expected Result** | "Not Found" error page displayed                                                                                                   
| **Actual Result**   | Pass - 404 page shown for invalid routes                                                                                           
| **Status**          | Pass                                                                                                                                  
| **Automated?**      | Yes - tests/navigation.spec.ts:22                                                                                                   
| **BDD Scenario**    | Given: user navigates to invalid route. When: route does not exist. Then: 404 page should display                                 
| **Attachments**     | N/A                                                                                                                                   

---

## TC-NAV-004

| Field               | Description                                                                                                                               
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------
| **Test Case ID**    | TC-NAV-004                                                                                                                           
| **Title**           | Navigation bar display                                                                                                               
| **Objective**       | Verify navigation bar shows appropriate links for user roles                                                                         
| **Priority / Risk** | Medium                                                                                                                                
| **Preconditions**   | User logged in                                                                                                                       
| **Dependencies**    | Navigation component operational                                                                                                     
| **Test Steps**      | 1. Log in as user, 2. Verify navbar displays, 3. Check available links                                                             
| **Data**            | Authenticated user session                                                                                                           
| **Expected Result** | Navbar shows Dashboard and Profile links                                                                                             
| **Actual Result**   | Pass - Navigation bar displaying correctly                                                                                           
| **Status**          | Pass                                                                                                                                  
| **Automated?**      | Yes - tests/navigation.spec.ts:27                                                                                                   
| **BDD Scenario**    | Given: user is logged in. When: user views page. Then: navbar should show appropriate links                                         
| **Attachments**     | N/A                                                                                                                                   

---

## TC-SEC-001

| Field               | Description                                                                                                                               
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------
| **Test Case ID**    | TC-SEC-001                                                                                                                           
| **Title**           | Session expiry and logout                                                                                                             
| **Objective**       | Verify system handles session expiration properly                                                                                   
| **Priority / Risk** | High                                                                                                                                  
| **Preconditions**   | User logged in, session timeout configured                                                                                           
| **Dependencies**    | Session management system operational                                                                                                 
| **Test Steps**      | 1. Log in user, 2. Wait for session expiry, 3. Verify automatic logout, 4. Check redirect                                         
| **Data**            | User session with timeout                                                                                                           
| **Expected Result** | User logged out and redirected to login                                                                                             
| **Actual Result**   | Pass - Session expiry handled correctly                                                                                             
| **Status**          | Pass                                                                                                                                  
| **Automated?**      | Yes - tests/security.spec.ts:4                                                                                                       
| **BDD Scenario**    | Given: user session expires. When: timeout occurs. Then: user should be logged out                                                 
| **Attachments**     | N/A                                                                                                                                   

---

## TC-SEC-002

| Field               | Description                                                                                                                               
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------
| **Test Case ID**    | TC-SEC-002                                                                                                                           
| **Title**           | User data access control                                                                                                             
| **Objective**       | Verify users cannot access other users' data                                                                                       
| **Priority / Risk** | High                                                                                                                                  
| **Preconditions**   | Multiple users exist, one user logged in                                                                                             
| **Dependencies**    | Access control system operational                                                                                                     
| **Test Steps**      | 1. Log in as user, 2. Attempt to access another user's data, 3. Verify access blocked                                             
| **Data**            | Different user's data                                                                                                               
| **Expected Result** | Access to other user's data prevented                                                                                               
| **Actual Result**   | Pass - Unauthorized access blocked                                                                                                   
| **Status**          | Pass                                                                                                                                  
| **Automated?**      | Yes - tests/security.spec.ts:23                                                                                                     
| **BDD Scenario**    | Given: user is logged in. When: user tries to access other's data. Then: access should be denied                                   
| **Attachments**     | N/A                                                                                                                                   

---

## TC-SEC-003

| Field               | Description                                                                                                                               
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------
| **Test Case ID**    | TC-SEC-003                                                                                                                           
| **Title**           | CSRF token validation                                                                                                                 
| **Objective**       | Verify CSRF tokens are present and validated in forms                                                                               
| **Priority / Risk** | High                                                                                                                                  
| **Preconditions**   | Application running, form accessible                                                                                                 
| **Dependencies**    | CSRF protection system active                                                                                                         
| **Test Steps**      | 1. Navigate to login form, 2. Inspect form for CSRF token, 3. Verify token presence                                               
| **Data**            | Form with CSRF protection                                                                                                           
| **Expected Result** | CSRF token present in form                                                                                                           
| **Actual Result**   | Pass - CSRF token found in form                                                                                                     
| **Status**          | Pass                                                                                                                                  
| **Automated?**      | Yes - tests/security.spec.ts:30                                                                                                     
| **BDD Scenario**    | Given: user accesses form. When: form loads. Then: CSRF token should be present                                                     
| **Attachments**     | N/A                                                                                                                                   

---

## TC-UI-001

| Field               | Description                                                                                                                               
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------
| **Test Case ID**    | TC-UI-001                                                                                                                           
| **Title**           | Dark mode toggle functionality                                                                                                       
| **Objective**       | Verify dark mode can be toggled and persists                                                                                       
| **Priority / Risk** | Low                                                                                                                                   
| **Preconditions**   | Application running, dark mode feature available                                                                                     
| **Dependencies**    | Theme system operational                                                                                                             
| **Test Steps**      | 1. Toggle dark mode on, 2. Verify theme changes, 3. Refresh page, 4. Verify persistence                                           
| **Data**            | Theme toggle interaction                                                                                                             
| **Expected Result** | Dark mode toggles and setting persists                                                                                               
| **Actual Result**   | Pass - Dark mode working with persistence                                                                                           
| **Status**          | Pass                                                                                                                                  
| **Automated?**      | Yes - tests/ui.spec.ts:4                                                                                                           
| **BDD Scenario**    | Given: user toggles dark mode. When: mode is changed. Then: setting should persist                                                 
| **Attachments**     | N/A                                                                                                                                   

---

## TC-UI-002

| Field               | Description                                                                                                                               
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------
| **Test Case ID**    | TC-UI-002                                                                                                                           
| **Title**           | Login form accessibility                                                                                                             
| **Objective**       | Verify login form meets accessibility standards                                                                                     
| **Priority / Risk** | Medium                                                                                                                                
| **Preconditions**   | Application running, login form accessible                                                                                           
| **Dependencies**    | Accessibility features implemented                                                                                                   
| **Test Steps**      | 1. Navigate to login form, 2. Check ARIA labels, 3. Verify keyboard navigation, 4. Test screen reader compatibility               
| **Data**            | Login form elements                                                                                                                 
| **Expected Result** | Form meets accessibility standards                                                                                                   
| **Actual Result**   | Pass - Accessibility features present                                                                                               
| **Status**          | Pass                                                                                                                                  
| **Automated?**      | Yes - tests/ui.spec.ts:13                                                                                                         
| **BDD Scenario**    | Given: user accesses login form. When: form is evaluated. Then: accessibility standards should be met                             
| **Attachments**     | N/A                                                                                                                                   

---

## TC-UI-003

| Field               | Description                                                                                                                               
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------
| **Test Case ID**    | TC-UI-003                                                                                                                           
| **Title**           | Error and success message display                                                                                                   
| **Objective**       | Verify messages are clearly visible and well-formatted                                                                             
| **Priority / Risk** | Medium                                                                                                                                
| **Preconditions**   | Application running, message system operational                                                                                       
| **Dependencies**    | Notification system active                                                                                                           
| **Test Steps**      | 1. Trigger error message, 2. Verify visibility and formatting, 3. Trigger success message, 4. Verify display                     
| **Data**            | Various message types                                                                                                               
| **Expected Result** | Messages displayed clearly and consistently                                                                                           
| **Actual Result**   | Pass - Message display working correctly                                                                                           
| **Status**          | Pass                                                                                                                                  
| **Automated?**      | Yes - tests/ui.spec.ts:20                                                                                                         
| **BDD Scenario**    | Given: system generates messages. When: messages appear. Then: they should be clearly visible                                     
| **Attachments**     | N/A                                                                                                                                   

---

## TC-UI-004

| Field               | Description                                                                                                                               
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------
| **Test Case ID**    | TC-UI-004                                                                                                                           
| **Title**           | Mobile responsive design                                                                                                             
| **Objective**       | Verify application functions properly on mobile devices                                                                             
| **Priority / Risk** | Medium                                                                                                                                
| **Preconditions**   | Application running, mobile viewport simulation                                                                                       
| **Dependencies**    | Responsive design implemented                                                                                                         
| **Test Steps**      | 1. Set viewport to 375x667px, 2. Navigate to login form, 3. Verify layout and functionality                                       
| **Data**            | Mobile viewport dimensions                                                                                                           
| **Expected Result** | Login form functions properly on mobile                                                                                             
| **Actual Result**   | Pass - Mobile responsiveness working                                                                                                 
| **Status**          | Pass                                                                                                                                  
| **Automated?**      | Yes - tests/ui.spec.ts:29                                                                                                         
| **BDD Scenario**    | Given: user accesses on mobile. When: page loads. Then: layout should be responsive                                               
| **Attachments**     | N/A                                                                                                                                   

---

## TC-LOC-001

| Field               | Description                                                                                                                               
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------
| **Test Case ID**    | TC-LOC-001                                                                                                                           
| **Title**           | Default language display                                                                                                             
| **Objective**       | Verify application displays in English by default                                                                                   
| **Priority / Risk** | Low                                                                                                                                   
| **Preconditions**   | Application running, localization system active                                                                                     
| **Dependencies**    | Internationalization system operational                                                                                             
| **Test Steps**      | 1. Access application, 2. Verify default language is English, 3. Check UI text                                                     
| **Data**            | Default language settings                                                                                                           
| **Expected Result** | UI displays in English by default                                                                                                   
| **Actual Result**   | Pass - Default English display working                                                                                               
| **Status**          | Pass                                                                                                                                  
| **Automated?**      | Yes - tests/localization.spec.ts:4                                                                                                 
| **BDD Scenario**    | Given: user accesses application. When: no language is selected. Then: English should be default                                   
| **Attachments**     | N/A                                                                                                                                   

---

## TC-LOC-002

| Field               | Description                                                                                                                               
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------
| **Test Case ID**    | TC-LOC-002                                                                                                                           
| **Title**           | Language switching functionality                                                                                                     
| **Objective**       | Verify UI updates when language is changed                                                                                         
| **Priority / Risk** | Low                                                                                                                                   
| **Preconditions**   | Multiple languages available                                                                                                         
| **Dependencies**    | Language switching system operational                                                                                               
| **Test Steps**      | 1. Access language selector, 2. Change language, 3. Verify UI text updates                                                         
| **Data**            | Alternative language selection                                                                                                       
| **Expected Result** | UI text updates to selected language                                                                                                 
| **Actual Result**   | Pass - Language switching working                                                                                                   
| **Status**          | Pass                                                                                                                                  
| **Automated?**      | Yes - tests/localization.spec.ts:12                                                                                               
| **BDD Scenario**    | Given: user changes language. When: selection is made. Then: UI should update accordingly                                         
| **Attachments**     | N/A                                                                                                                                   

---

## Test Execution Environment

**Browser:** Chromium (Chrome DevTools Protocol)  
**Execution Mode:** Headless for CI, Headed for local development  
**Parallel Workers:** 4 concurrent test workers  
**Test Timeout:** 30 seconds per test  
**Assertion Timeout:** 5 seconds  
**Retries:** 0 in development, 2 in CI  

**Artifacts:** Screenshots and videos captured on test failures  
**Reporting:** HTML test reports with detailed failure information  
**Coverage:** End-to-end user workflows and edge cases  

**Total Test Cases:** 47  
**Pass Rate:** 100% (47/47)  
**Average Execution Time:** 38 seconds