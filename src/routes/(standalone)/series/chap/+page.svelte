<script>
    import "$lib/app.css";

    import { contentWidth } from '$lib/stores/contentWidth';
    let width = 500;
    contentWidth.subscribe(val => width = val);
</script>

<section class="w-full bg-blue-500" style={`max-width: ${width}px;`}>
    <img src="https://i.imgur.com/SNr4G69.jpeg" alt="" class="w-full opacity-50">
    <img src="https://i.imgur.com/SNr4G69.jpeg" alt="" class="w-full opacity-50">
</section>