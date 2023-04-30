
# My Application

The project is generated by [LoopBack](http://loopback.io).

This application is a website that allows users to add,edit,delete books along with its associated authors.

Model for authors:
{
    "name":string,
    "biography":string
}

Model for books:
{
    "title":string,
    "pubisher":string,
    "year":int,
    "authorId": int
}

I understand that the authorId was supposed to be a string. However, i tried creating a schema in postgresql with foreign key constraint and use Loopback's `discoverAndBuildModel()` method but i kept running into error and could not find a way around it

One trade-off i had to do with setting authorId as integer and not having a proper foreign key constraint was that each time i created or deleted a book, i had to check if the author existed or if the author had one one book which was about to delete, which would mean i would have to delete the author to mimic the `CASCADE` sql command

I do apologise if the application is not up to requirement as I only had 5 days to do it because i had finals until 26 April 2023 and I have to submit by 1st May. If i had more time i would have found a way around the postgresql foreign key constraint and properly implement it and also refractor some of the code to makeit look more clean and understandable as i understand its quite messy.







## Tech Stack

**Client:** React

**Server:** Node.js with Loopback 3.x

**Database:** Postgresql




## Run Locally

Clone the project

```bash
git clone https://github.com/Shreyas-hacker/Book-Library.git
```

Go to the project directory

```bash
cd my-project
```

Install dependencies

```bash
npm install
cd client
npm install
```

Start the server on one terminal

```bash
node .
```

open up another terminal
```bash
cd client
npm start
```


## Optimizations
Inside my `client` folder, I made multiple sub-folder under `src` folder, mainly:
 - `Authors`
 - `Book`
 - `pages`

Authors: Has `AuthorForm.js` where it enables user to edit the details of the AuthorForm

Book: Has `Book.js` and `Book.css` where the Book.js is a component for the book that displays the details of the book while the Book.css styles it. This allows me to prevent copy pasting of code and can render multiple books with just the use of a single component

pages: Has all the pages such as `AddBook.js`,`EditBook.js`,`DeleteConfirmation.js` and `Home.js`


## Feedback

If you have any feedback, please reach out to me at shreyashegde1@gmail.com

