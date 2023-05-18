document.addEventListener('DOMContentLoaded', function() {
  let userId = document.body.dataset.userId;

  // Função para obter o ID do usuário após o login
  function getUserIdAfterLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const loginData = {
      username: username,
      password: password
    };

    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Erro ao fazer login');
        }
      })
      .then(data => {
        alert('Login realizado com sucesso!');
        userId = data.userId;
        if (data.isAdmin) {
          // Redirect to admin page
          window.location.href = '/admin-page';
        } else if (data.isUser) {
          // Redirect to user page
          window.location.href = '/reservation';
        } else {
          // Redirect to default page
          window.location.href = '/';
        }
      })
      .catch(error => {
        alert('Usuário ou senha incorretos. Tente novamente.');
        console.error('Erro na requisição:', error);
      });
  }

  // Formulário para o login
  const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        getUserIdAfterLogin();
      });
  }
  
  //Formulário para o registro de usuario 
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', async function(event) {
      event.preventDefault();
  
      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const registerData = {
        username: username,
        email: email,
        password: password
      };
      
      try {
        const response = await fetch('/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(registerData)
        });
  
        if (response.redirected) {
          window.location.href = response.url;
        } else if (response.ok) {
          const data = await response.json();
          alert(data.message);
          document.getElementById('username').value = '';
          document.getElementById('email').value = '';
          document.getElementById('password').value = '';
        } else {
          throw new Error('Erro ao cadastrar usuário');
        }
      } catch (error) {
        alert('Erro ao cadastrar usuário. Tente novamente mais tarde.');
        console.error('Erro na requisição:', error);
      }
    });
  }  

  //Log out
  const logoutButton = document.getElementById('logoutButton');
  if (logoutButton) {
    logoutButton.addEventListener('click', async function() {
      try {
        const response = await fetch('/logout');
  
        if (response.redirected) {
          window.location.href = response.url;
        } else {
          throw new Error('Erro ao fazer logout');
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
      }
    });
  } 

});