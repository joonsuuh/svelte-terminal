<script lang="ts">
	let { children } = $props();
</script>

<div class="blog">
	{@render children()}
</div>

<style>
    @font-face {
        font-family: Inter;
        src: url('$lib/assets/fonts/Inter-Regular-english.woff2') format('woff2');
        font-weight: normal;
        font-style: normal;
        font-display: block;
    }
    
    @font-face {
        font-family: 'Inter Blog';
        src: url('$lib/assets/fonts/Inter-Bold-english.woff2') format('woff2');
        font-weight: bold;
        font-style: normal;
        font-display: block;
    }
    
    @font-face {
        font-family: 'Inter Blog';
        src: url('$lib/assets/fonts/Inter-Italic-english.woff2') format('woff2');
        font-weight: normal;
        font-style: italic;
        font-display: block;
    }

    .blog {
        font-family: Inter, -apple-system, Roboto, sans-serif;
        font-size: 14pt;
        font-weight: normal;
    }   
</style>