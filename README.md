# Tickitz fe  

It's a tickitz frontend. learning base project from pijarcamp.  
Author : Rizqi Pratama  

## How to run

```bash
# Setup the db using postgres
# Configure the dot env

# run on development
npm run start

# run on production
npm run build
serve -s build

```

## Runtime Requirement

- Serve  
``npm install -g serve``

### Known UI Bug

Detail Movie Page

- [ ] there unresponsive page

Select seat page

- [ ] change movie button above checkout button not associated
- [x] still can't marked booked seat
- [x] still can't marked selected item
- [ ] still no error message on select seat page
- [ ] unselect seat still not working
- [ ] No loading indicator
- [ ] No error handler

## Routing Table

**Pages** | **URI** | **Slug**
--------------|:-------:|:--------:
Home          |    /    | no
MovieDetail   | /detail | yes
ErrorPage404  |   /*    | no
