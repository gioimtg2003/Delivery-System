"use client";
export function getServerSideProps() {
    let env = process.env.NODE_ENV;
    return {
        props: {
            API_URI:
                env === "development"
                    ? process.env.NEXT_PUBLIC_DEVELOPMENT_API_URI
                    : process.env.NEXT_PUBLIC_PRODUCTION_API_URI,
            API_GOOGLE_MAPS:
                env === "development"
                    ? process.env.NEXT_PUBLIC_DEVELOPMENT_API_GOOGLE_MAPS
                    : process.env.NEXT_PUBLIC_PRODUCTION_API_GOOGLE_MAPS,
            API_ROOT:
                env === "development"
                    ? process.env.NEXT_PUBLIC_DEVELOPMENT_API_ROOT
                    : process.env.NEXT_PUBLIC_PRODUCTION_API_ROOT,
        },
    };
}
