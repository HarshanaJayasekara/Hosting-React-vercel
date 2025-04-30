
link Hosting : https://face-recognition-voting-web-application-5yiz.vercel.app/admin-chat
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)





```bash

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './pages/user/AuthContext';


// Admin & Setup Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminRegister from './pages/admin/AdminRegister';
import Home from './pages/Home';
import ElectionStart from './pages/StartElection/ElectionStart';

// Voter & Candidate Pages
import CandidateProfile from "./pages/Candidate/CandidateProfile";
import CandidateRegister from './pages/Candidate/CandidateRegister';
import CandidateList from "./pages/Candidate/CandidatesList";

import VoterRegister from './pages/voter/VoterRegister';


// Voting Process Pages
import VoterIdentify from './pages/StartElection/VoterIdentify';
import ThankYou from './pages/StartElection/ThankYou';

// Home page add part2
import FindPersonPage from './pages/FindPersonPage';
import LeadersRegister from './pages/LeadersRegister';
import LeaderList from './pages/LeaderList';
import VotePage from './pages/StartElection/VotePage';

import CandidateManager from './pages/Candidate/CandidateManager';
import ResetElection from './pages/ResetElection';

import VoteCountPage from './pages/VoteCountPage';
import Results from './pages/Results';

// user 
import Homes from './pages/user/userHome';
import VoterList from './pages/user/voterList';
import RulesGuidelines from './pages/user/RulesGuidelines';
import IdeasComplaints from './pages/user/IdeasComplaints';
import VotingLocations from './pages/user/VotingLocations';

//chat
import Chat from './pages/user/chat';
import Login from './pages/user/Login';
import UserLogin from './pages/user/Login';
import AdminLogin from './pages/user/AdminLogin';

// Main App Component
function App() {
  return (
    <AuthProvider>
    <div className='container'>
    <Router>
      <Routes>
        {/* Admin Panel */}
        <Route path="/" element={<AdminRegister />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/start-election" element={<ElectionStart />} />

        {/* Home page connect pages*/}
          <Route path="/FindPersonPage" element={<FindPersonPage />} />
          <Route path="/LeadersRegister" element={<LeadersRegister />} />
          <Route path="/LeaderList" element={<LeaderList /> } />

        {/* Voter & Candidate Registration final result*/}
        <Route path="/voter-register" element={<VoterRegister />} />
        

        {/* Voting Flow */}
        <Route path="/voter-identify" element={<VoterIdentify />} />
        <Route path="/ThankYou" element={<ThankYou />} />
        <Route path='/VotePage' element={<VotePage />} />
        




        {/*reset  2025.04.16 */}
        <Route path="/candidate-register" element={<CandidateRegister />} />
        <Route path="/candidate/:id" element={<CandidateProfile />} />
        <Route path="/CandidateList" element={<CandidateList />} />
        <Route path='/CandidateManager' element={<CandidateManager />} />

        
        <Route path="/reset-election" element={<ResetElection />} />
        <Route path='/Results' element={<VoteCountPage />} />
        <Route path='/Resulats' element={<Results />} />

        {/* user */}
        <Route path='userHome' element={<Homes />} />
        <Route path='/VoterList' element={<VoterList />} />
        <Route path='/RulesGuidelines' element={<RulesGuidelines />} />
        <Route path='/IdeasComplaints' element={<IdeasComplaints  />} />
        <Route path='/VotingLocations' element={<VotingLocations />} />

        {/*chat */}
        <Route path='/chat' element={<Chat />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/UserLogin' element={<UserLogin />} />
        <Route path='/AdminLogin' element={<AdminLogin />} />
      </Routes>
    </Router>
    

    </div>
    </AuthProvider>
  );
}

export default App;
```
