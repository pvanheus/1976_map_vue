<template>
  <div class="uk-container uk-container-expand" style="background-color: #2191F2; color: #fff;">
    <nav class="uk-navbar">
      <div class="uk-navbar-left">
        <h3>In memory of 1976</h3>
      </div>
      <div class="uk-navbar-right">
        <ul class="uk-navbar-nav uk-visible@m">
          <li class="uk-active">
            <a href="#mapWrapper">Map</a>
          </li>
          <li class="uk-active">
            <a href="#tableWrapper">List</a>
          </li>
          <li class="uk-active">
            <a href="#">Documentation</a>
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
  name: "Nav"
};
</script>

<style scoped></style>
