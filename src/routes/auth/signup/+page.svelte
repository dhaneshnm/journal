<script lang="ts">

  
  let title = $state('');
  let content =   $state('');
  let moodId =   $state('');
  let tagsInput =  $state('');

  let wordCount = $derived( content ? content.split(/\s+/).filter(word => word.length > 0).length : 0)
  

</script>

<section>
  <form method="post">
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required>
      
      <label for="password">Password:</label>
      <input type="password" id="password" name="password" required>

      <label for="name">User Name</label>
      <input type="text" id="name" name="name" required>
      
      <button type="submit">Sign Up</button>
  </form>
</section>