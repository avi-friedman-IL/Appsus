const { useState, useEffect, useRef } = React;

export function UserMsg({ msg }) {
  const [message, setMessage] = useState(null);
  const timeoutIdRef = useRef();

  useEffect(() => {
    setMessage(msg);
    if (msg) {
      timeoutIdRef.current = setTimeout(() => {
        setMessage(null);
      }, 3000);
    }

    return () => {
      clearTimeout(timeoutIdRef.current);
    };
  }, [msg]);

  // function onCloseMsg() {
  //   setMessage(null);
  //   clearTimeout(timeoutIdRef.current);
  // }

  if (!msg) return <React.Fragment></React.Fragment>;
  return (
    <section className={`user-msg ${msg.type || ""}`}>
      <p>{msg.toUpperCase()}</p>
    </section>
  );
}
