

describe('Blog app', function() {
    beforeEach(function() {
    cy.request("POST", "http://localhost:3003/api/testing/reset")
    const user = {
      name: 'jams',
      username:'doctor',
      password:'colocolo'
    }
    cy.request("POST", "http://localhost:3003/api/users/", user)
      cy.visit("http://localhost:3000")
    })
  
    it('Login form is shown', function() {
      
       cy.contains('Login').click()
         cy.contains('Log in to application')
        cy.get("#username")
        cy.get("#password")
        cy.get("#login-button")
    })
    //excercise 5.20*


     it('login fails with wrong password', function(){
     cy.contains('Login').click()
     cy.get('#username').type('doctor')
     cy.get('#password').type('colo')
     cy.get('#login-button').click()       
    })



    describe('When logged in', function() {
      beforeEach(function() {
        // log in user here     
        cy.login({username:'doctor', password:'colocolo'})
      })
  
      it('A blog can be created', function() {
        cy.contains("create new blog").click()
        cy.get('#title').type('agtr')
        cy.get('#author').type('kkk')
        cy.get('#url').type('http://localhost:3003/api/blogs')
        cy.get('#create').click()
                
      })

      it('user can like a blog', function(){
        cy.contains("create new blog").click()
          cy.get('#title').type('agtr')
          cy.get('#author').type('kkk')
          cy.get('#url').type('http://localhost:3003/api/blogs')
          cy.get('#create').click()
  
        // cy.get('#title-author')
        cy.get('#view').click()
        cy.get('#like').click()
        cy.get('#like').click()
      })

      it('user who created a blog can delete', function(){
         cy.contains("create new blog").click()
          cy.get('#title').type('agtr')
          cy.get('#author').type('kkk')
          cy.get('#url').type('http://localhost:3003/api/blogs')
          cy.get('#create').click()
  
        // cy.get('#title-author')
        cy.get('#view').click()
        cy.get('#like').click()
        cy.get('#like').click()
        cy.get('#delete').click()
      })

    })
    
    it('sorted')
   
  })


  

