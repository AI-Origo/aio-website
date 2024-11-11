# _plugins/news_page_generator.rb
module Jekyll
    class NewsPageGenerator < Generator
      safe true

      def generate(site)
        return unless site.data['news']

        site.data['news'].each do |article|
          site.pages << NewsPage.new(site, site.source, 'news', article)
        end
      end
    end

    class NewsPage < Page
      def initialize(site, base, dir, article)
        @site = site
        @base = base
        @dir = dir
        @name = "#{article['slug']}.html"

        self.process(@name)
        self.read_yaml(File.join(base, '_layouts'), 'news.html')

        self.data['layout'] = 'news'
        self.data['title'] = article['title']
        self.data['date'] = article['date']
        self.data['lead'] = article['lead']
        self.content = article['content']
      end
    end
end