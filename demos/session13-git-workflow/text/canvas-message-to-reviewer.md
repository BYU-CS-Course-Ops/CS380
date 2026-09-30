Subject: Your review for today's demo (Prop Loft PR)

Thanks for being today's reviewer! When I request your review, you'll get a GitHub notification, and the pull request will be at https://github.com/prop-loft/prop-loft-demo/pulls. Here's what to post.

1. Go to the PR's "Files changed" tab.

2. In catalog/views.py, hover over the line
       query = request.GET.get("q", "")
   click the blue "+", and add this comment:

       If someone types or pastes the search with a stray space, like " bustle ", this finds nothing, because the spaces become part of the search. Could we strip the query first?

3. Then, anywhere else (the "+" on the items.filter(...) line works), add a second comment:

       Should this also search by category? The design doc lists "search by name, category, and size."

4. Click "Review changes" (top right), choose "Request changes", and submit.

5. Wait for me to push a fix. When I say so in class, go back to "Review changes", choose "Approve", and submit.

Don't worry about the timing. I'll tell you out loud when each step is up.
