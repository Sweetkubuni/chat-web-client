// @refresh reload
import { Suspense } from "solid-js";
import {
  A,
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from "solid-start";
import "./root.css";


export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title>Demo Chat</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta name="description" content="Demo Web Chat" />
      </Head>
      <Body>
        <Suspense>
          <ErrorBoundary>
            {/* <A href="/">Index</A>
            <A href="/about">About</A> */}
            <Routes>
              <FileRoutes />
            </Routes>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
