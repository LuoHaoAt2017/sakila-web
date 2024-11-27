import { useEffect } from "react";

// 用户名和密码    
const username = 'user';
const password = 'password';

function About() {

  useEffect(() => {
    // 将用户名和密码进行 Base64 编码    
    const credentials = window.btoa(`${username}:${password}`);
    window.fetch('/api/hello', {
      headers: {
        'Authorization': `Basic ${credentials}`, // Basic Auth
        'Content-Type': 'application/json' // 根据需要设置其他请求头  
      }
    }).then(resp => resp.json()).then(console.log);
  }, []);
  return <div></div>
}

export default About;
