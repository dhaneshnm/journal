<script lang="ts">
  import '../app.css';
</script>

<div class="app">
  <header>
    <div class="container">
      <h1>Journal App</h1>
      <nav>
        <a href="/">Home</a>
        <a href="/new">New Entry</a>
        <a href="/tag">Tags</a>

      </nav>
    </div>
  </header>
  
  <main class="container">
    <slot />
  </main>
  
  <footer>
    <div class="container">
      <p>© 2023 Journal App</p>
    </div>
  </footer>
</div>
