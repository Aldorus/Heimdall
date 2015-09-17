describe("Core loading service", function () {
    // Load the module
    beforeEach(function() {
        module(function($provide) {
            $provide.service('', function() {
                //this.
            })
        })
    });
    var loading, httpBackend;

    // Load the controller
    beforeEach(inject(function (_loading_, $httpBackend) {
        loading = _loading_;
        httpBackend = $httpBackend;
    }));

    it("test if loading service is ok", function () {
        expect(true).toBe(true);
    });

    it('test load data', function() {
        httpBackend.whenGET("http://api.reddit.com/user/yoitsnate/submitted.json").respond({
            data: {
                children: [
                    {
                        data: {
                            subreddit: "golang"
                        }
                    },
                    {
                        data: {
                            subreddit: "javascript"
                        }
                    },
                    {
                        data: {
                            subreddit: "golang"
                        }
                    },
                    {
                        data: {
                            subreddit: "javascript"
                        }
                    }
                ]
            }
        });
        redditService.getSubredditsSubmittedToBy("yoitsnate").then(function(subreddits) {
            expect(subreddits).toEqual(["golang", "javascript"]);
        });
        httpBackend.flush();
    });
});
