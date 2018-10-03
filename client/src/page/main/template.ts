export default (html, state) => html`
  <section>
    <div class="zk-main-menu">
      <nav>
        <zk-main-menu></zk-main-menu>
      </nav>
    </div>
    ${state ? state.name : ''}
    <zk-sign-in></zk-sign-in>
  </section>
`;