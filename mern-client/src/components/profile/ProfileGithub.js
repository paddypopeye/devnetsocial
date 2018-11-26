import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import Profile from './Profile';
import PropTypes from 'prop-types';

class ProfileGithub extends Component {
  constructor(props){
    super(props);
    this.state = {
      clientID:'70e0b65ec95004e47fe4',
      clientSecret:'6f64848f20eb7b7054f78488a69c17d9f1daa39e',
      count: 8,
      sort: 'created asc',
      repos: []
    }
  }
  componentDidMount(){
    const { username } = this.props;
    const  {count, sort, clientID, clientSecret} = this.state;
    
    fetch(`https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientID}&client_secret=${clientSecret}`)
    .then(res => res.json())
    .then(data => {
      
        this.setState({repos: data}) 
        console.log(this.repos)
      
        
    }).catch(err => console.log(err))

  }
  render() {

     const {repos} = this.state;
     const repoItems = repos.map(repo => (
       <div key={repo.id} className="card card-body mb-2">
            <div className="row" >
              <div className="col-md-6">
                   <h4>
                     <Link to={repo.html_url} className="text-info" target="_blank">
                                {repo.name}
                     </Link>
                    </h4>
                   <p>{repo.description}</p>
              </div>
              <div className="col-md-6">
                  Stars: <span className="badge badge-info mr-1">{repo.stargazers_count}</span>
              </div>
              <div className="col-md-6">
                  Watchers: <span className="badge badge-secondary mr-1">{repo.watchers_count}</span>
              </div>
              <div className="col-md-6">
                  Forks: <span className="badge badge-success">{repo.forks_count}</span>
              </div>
            </div>
       </div>
     ))//end render

     return (
       <div ref='myref'>
         <hr/>
         <h3 className='mb-4'>Github Repos</h3>
              {repoItems}
       </div>
     )
   }
 }

 ProfileGithub.propTypes = {
   username: PropTypes.string.isRequired
 } 

export default  ProfileGithub;