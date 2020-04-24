$(document).ready(function () {
    console.log("Ready");
    $("#searchuser").keyup(function () {
        let username = this.value
        $.ajax({
            url: 'https://api.github.com/users/' + username,
            method: "GET",
            type: "application/json",
            data: {
                client_id: '#your_client_id',
                client_secret: '#your_client_secret'
            },
            success: function (user) {

                // Loading Profile Section of a User
                $('#profile').html(`
                    <div class="card mb-3" style="max-width: 540px;">
                        <div class="row no-gutters">
                            <div class="col-md-4">
                                <img src="${user.avatar_url}" class="card-img profile_image" alt="...">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">${user.name}</h5>
                                    <p class="card-text"><span class="card-text-head">Bio: </span>${user.bio}</p>
                                    <p class="card-text"><small class="text-muted"><span class="card-text-head">Public Repo: </span>${user.public_repos}</small></p>
                                    <a href="${user.html_url}" target="_blank">
                                        <button class="btn btn-primary">Visit Profile</button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br>
                `); 
                
                fetchRepo(username);
            }
        });
    });

    function fetchRepo(username) {
        // Loading repos of the entered User
        $.ajax({
            url: 'https://api.github.com/users/' + username + '/repos',
            method: 'GET',
            type: 'application/json',
            data: {
                client_id: '<your_client_id>',
                client_secret: '<your_client_secret>'
            },
            success: function(repos) {
                $("#repos").empty();
                for (repo of repos) {
                    $("#repos").append(`
                    <div class="card" style="margin-bottom: 20px;">
                    <div class="card-body">
                    <h5 class="card-title">
                        Repository Name: ${repo.name}
                        <span class="badge badge-success">Forks: ${repo.forks_count}</span>
                        <span class="badge badge-dark">Watchers: ${repo.watchers_count}</span>
                        <span class="badge badge-danger">Stars: ${repo.stargazers_count}</span>
                    </h5>
                    <p class="card-text">Description: ${repo.description}</p>
                    <a href="${repo.html_url}" class="btn btn-primary" target="_blank">View Repo</a>
                    </div>
                </div>
                    `);
                }
            },
        });
    }
    
});