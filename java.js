const username = document.getElementById("username");
    const button = document.getElementById("btn");
    const info = document.getElementById("info");

    button.addEventListener("click", () => {
      const input = username.value.trim();

      if (!input) {
        info.innerHTML = "<p>Please enter a username.</p>";
        return;
      }

      
      fetch(`https://api.github.com/users/${input}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("User not found");
          }
          return res.json();
        })
        .then((data) => {
          
          info.innerHTML = `
            <h2>GitHub Profile: ${data.login}</h2>
            <img src="${data.avatar_url}" alt="Avatar" width="150" height="150">
            <p><strong>Name:</strong> ${data.name || "N/A"}</p>
            <p>Bio: ${data.bio || "N/A"}</p>
            <p>Followers: ${data.followers}</p>
            <p>Following:${data.following}</p>
            <p>Repositories: ${data.public_repos}</p> 
            <p>Location: ${data.location || "N/A"}</p>
            <p><strong>Profile Created At: ${new Date(data.created_at).toLocaleDateString()}</p>
            <p>Profile Updated At: ${new Date(data.updated_at).toLocaleDateString()}</p>
            <p>GitHub URL: <a href="${data.html_url}" target="_blank">${data.html_url}</a></p>
          `;
        })
        .catch((err) => {
          console.log(err);
          info.innerHTML = `<p>Error: ${err.message}</p>`;
        });
    });