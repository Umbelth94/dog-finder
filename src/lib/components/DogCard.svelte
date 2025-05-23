<script lang="ts">
  export let dog: {
    img: string;
    name: string;
    age: number;
    zip_code: string;
    breed: string;
  };
</script>

<style>
  .card {
    border: 1px solid #ccc;
    border-radius: 1rem;
    padding: 1rem;
    width: 300px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.05);
    transition: transform 0.2s ease;
  }

  .card:hover {
    transform: scale(1.02);
  }

  .dog-img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 0.5rem;
  }

  .info {
    margin-top: 1rem;
  }

  .info h2 {
    margin: 0;
    font-size: 1.25rem;
  }

  .info p {
    margin: 0.25rem 0;
    color: #555;
  }
</style>

<div class="card">
  <img class="dog-img" src={dog.img} alt={`Photo of ${dog.name}`} />
  <div class="info">
    <h2>{dog.name}</h2>
    <p><strong>Breed:</strong> {dog.breed}</p>
    <p><strong>Age:</strong> {dog.age}</p>
    <p><strong>Zip Code:</strong> {dog.zip_code}</p>
  </div>
</div>