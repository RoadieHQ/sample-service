This is my testing document


```diff
diff --git a/src/components/CallToAction/EmailCaptureForm.js b/src/components/CallToAction/EmailCaptureForm.js index eb154ca..9450b93 100644
--- a/src/components/CallToAction/EmailCaptureForm.js
+++ b/src/components/CallToAction/EmailCaptureForm.js
@@ -56,7 +56,7 @@

const EmailCaptureForm = ({
           <Button
             text={buttonText}
             disabled={disabled}
-            icon={<PaperAirplaneIcon className="h-4 w-4 mr-1" />}
+            prefixIcon={<PaperAirplaneIcon />}
             id={buttonId}
             fullWidth
             color="primary"
```



<!-- termynal -->
```console
$ show progress
---> 100%
Done!
```



# Kroki Mermaid Chart:

```kroki-mermaid
sequenceDiagram
GitLab->>Kroki: Request rendering
Kroki->>Mermaid: Request rendering
Mermaid-->>Kroki: Image
Kroki-->>GitLab: Image
```
