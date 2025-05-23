<script lang="ts">
  export let dog: {
    img: string;
    name: string;
    age: number;
    zip_code: string;
    breed: string;
  };
</script>

<div class="border-solid border-1 rounded-[0.5rem] p-[1rem] mx-3 my-3 w-[300px] shadow-md transition ease hover:scale-[1.02]">
  <img class="w-[100%] h-[200px] rounded-[1rem] " src={dog.img} alt={`Photo of ${dog.name}`} />
  <div class="mt-[1rem]">
    <h2 class="m-0 text-[1.25rem]">{dog.name}</h2>
    <p class="mx-0 my-[0.25rem]"><strong>Breed:</strong> {dog.breed}</p>
    <p class="mx-0 my-[0.25rem]"><strong>Age:</strong> {dog.age}</p>
    <p class="mx-0 my-[0.25rem]"><strong>Zip Code:</strong> {dog.zip_code}</p>
  </div>
</div>