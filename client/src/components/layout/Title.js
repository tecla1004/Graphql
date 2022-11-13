
const getStyles = () => ({
    title: {
      fontSize: 24,
      padding: "15px",
      marginBottom: "15px",
      textAlign: "center",
    },
  });
  
  const Title = ({ title }) => {
    const styles = getStyles();
    return <h1 style={styles.title}>{title}</h1>;
  };
  
  export default Title;
  