# Review-manager

## Description

Meet Reviewer manager - a App created for managing reviews.<br/>
This is the final project of the iTransition internship.<br/>
Demo: https://review-manager-rust.vercel.app/ <br/>
Backend repository: https://github.com/Nazaruk-D/Review-manager-Server <br/>
<br/>
<img src="https://www.dropbox.com/s/bt3nqniyx6yqoz1/review-manager-screen1.png?raw=1" alt="image">



## Tasks for the project:
* Non-authenticated users can only use search and can't create reviews, leave comments, rating, or likes.
* Authenticated not-admins can access everything except the admin-page, which only shows a list of users.
* Authentication via social networks is necessary and should support at least two.
* Admins can see every user page and review as its creator and can edit or create reviews under a user's page.
* Every page provides access to full-text search, and the results are represented as a review list.
* Every user has a personal page that contains a table of reviews with filters, sorting, and actions for review creation, deletion, editing, and opening in read mode.
* Every review should have a review name, name of the reviewed piece of art, group, tags, review text with markdown formatting, optional image, and grade in the range from 0 to 10.
* All images should be stored in the cloud, and the upload control should support drag-n-drop.
* The main page should show recently added reviews, reviews with the highest grades, and a tag cloud.
* Users can leave ratings (1..5 stars) for reviewed pieces (1 per user per review), and the average user rating is displayed everywhere in the app where the review name is displayed.
* Users can leave "likes" for reviews (1 per user per review), and the sum of likes is displayed after the review author's name.
* When two users review the same piece of art, it's two unrelated reviews.
* Comments are displayed after the review in read mode and are linear (new comments are always put at the end), and comments are updated automatically.
* The application should support at least two UI languages, English and another one, and should support two skins/themes (light and dark).
* Required tools include Bootstrap, support for different screen resolutions, ORM/ODM for data access, engine for full-text search.
Additional optional requirements:
* Advanced admin page for user management.
* Uploading arbitrary numbers of images for a review.
* Exporting reviews to PDF with images.
___


### The following libraries are installed in this project:

- **react**

- **@reduxjs/toolkit**

- **@types/react-dom**

- **react-router-dom**

- **react-dropzone**

- **gapi-script**

- **@supabase/auth-ui-react**

- **@supabase/supabase-js**

- **chartjs-chart-wordcloud**

- **typescript**

- **material-ui**

- **html2canvas**

- **i18next**

- **jspdf**

- **socket.io**

- **formik**

- **jest**

- **sass**


## How to start a project

After git clone 'link' install all dependencies from package.json:

### `yarn`


and then run the project:

### `yarn start`

