const Contact = () => {

  function connect () {
    localStorage.setItem("users_id", 1)
  }

  return (
    <div className="body">
      <h1>Contact Me</h1>;

      <a onClick={connect}>coinnect</a>
    </div>
    )
  };  
  export default Contact;
  