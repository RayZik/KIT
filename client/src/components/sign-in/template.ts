export default (html, state) => html`
    <input
      name="zk-login-input"
      value="${state.login}"
    />
    <input
      name="zk-password-input"
      value="${state.password}"
    />

    <button type="button">Войти</button>
`;