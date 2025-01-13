## PassLock 🔐

PassLock is an application that helps user to securly store their passwords. 

#### Tech Stack used 
- Next JS
- Tailwind CSS 
- Appwrite 
- React Hook Forms 
- Zod 
- ArcJet

### Folder Structure 
- Actions 
    - password.action.ts: Necessary operations for passwords 
    - users.action.ts: Necessary operations required for user crud operations
- App 
    - (auth): Sign In, Sign Up, Forgot Password, Reset Password 
    - (main): Dashboard Page
    - maintenance: Maintenance Page 
    - not-found.tsx: 404 Page 
    - page.tsx: Landing Page for PassLock 
- Components 
    - UI: Contains UI Components for MagicUI, shadcn, Accternity UI 
    - Other .tsx files: Contains Reusuable compoents 
- Hooks 
    - use-toast: shadcn use-toast hook
- Lib 
    - appwrite: Appwrite setup 
    - arcjet: Arcjet setup 
    - zodSchema: zod schema 
    - utils.ts: Contains utility function 
- Public: 
    - Contains images for PassLock 
- Maintenance JSON: For toggling on and off when PassLock is under maintenance 
- Changelog MD: For adding the changelog for every release 
- Middleware.ts: Contains all the re-routing logic 

