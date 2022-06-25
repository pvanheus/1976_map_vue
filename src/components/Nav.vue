<template>
  <div
    class="uk-container uk-container-expand navWrapper"
    uk-sticky="bottom: #offset"
  >
    <nav class="uk-navbar">
      <div class="uk-navbar-left">
        <h2 class="logoh2">1976 Death Map</h2>
      </div>
      <div class="uk-navbar-right">
        <ul class="uk-navbar-nav uk-visible@m">
          <li class="uk-active">
            <a href="#mapWrapper">Map</a>
          </li>
          <li class="uk-active">
            <a href="#tableWrapper">List</a>
          </li>
        </ul>
        <a
          uk-navbar-toggle-icon
          href="#offcanvas"
          uk-toggle
          class="uk-navbar-toggle uk-hidden@m uk-icon uk-navbar-toggle-icon"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            data-svg="navbar-toggle-icon"
          >
            <rect y="9" width="20" height="2" />
            <rect y="3" width="20" height="2" />
            <rect y="15" width="20" height="2" />
          </svg>
        </a>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Nav",
};
</script>

<style scoped>
.navWrapper {
  background-color: #2191f2;
  color: #fff;
  box-shadow: 0 0 3px 1px #888888;
}

nav {
  margin: 0 290px;
}

.logoh2 {
  color: #fff;
}
.uk-navbar-nav > li.uk-active > a {
  color: #fff;
  font-weight: 700;
}
</style>
