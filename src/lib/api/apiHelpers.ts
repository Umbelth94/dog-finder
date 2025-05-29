//This is used to get the actual from value from the next URl string 
//Before this function, I was getting an entire string back as the cursor. 
export function extractCursorFromUrl(url:string | undefined): string {
    if (!url) return '';
    const parsedUrl = new URL(`https://thisdoesntmatter.com${url}`); //Dummy base url since we only need query params
    console.log('logging url from extractCursorfunction', url);
    return parsedUrl.searchParams.get('from') ?? '';
}